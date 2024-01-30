import { Component, OnDestroy } from '@angular/core';
import { Usuario } from '../../interfaces/Usuario';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { OrdenService } from '../../services/orden.service';
import { Producto } from '../../interfaces/Producto';
import { ItemService } from '../../services/item.service';
import { Item } from '../../interfaces/Item';
import { ProductoService } from '../../services/producto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, forkJoin } from 'rxjs';
import { Orden } from '../../interfaces/Orden';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.css'
})
export class BuyComponent implements OnDestroy{
  form!: FormGroup;
  currentUser?: Usuario;
  listProductos: Producto[] = [];
  listItems: Item[] = [];
  itemId: number;
  loading: boolean = true;
  modo: number = 0; // 0 = Comprar todos / 1 = Comprar uno
  total: number = 0;
  private userSubscription: Subscription;

  constructor(
    private _userService: UserService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private _snackBarService: SnackbarService,
    private _ordenService: OrdenService,
    private _itemService: ItemService,
    private _productoService: ProductoService,
    private fb: FormBuilder) {
      this.userSubscription = this._userService.currentUser$.subscribe((user) => {
        this.currentUser = user!;
        if (user) {
          this.currentUser = user;
          this.form = this.fb.group({
            nombre: [this.currentUser.nombre, [Validators.required]],
            apellido: [this.currentUser.apellido, [Validators.required]],
            celular: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
            correo: [this.currentUser.email, [Validators.required, Validators.email]],
            direccion: [''],
            num_tar: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
            mes: ['', [Validators.required]],
            year: ['', [Validators.required]],
            nombre_tar: ['', [Validators.required]],
            cvv: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
            terms: [false, [Validators.requiredTrue]]
          });
        }
      });

    this.itemId = Number(this.aRoute.snapshot.paramMap.get('id'));
    this.evaluarModo();

  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  cerrarSesion(){
    this._userService.singOff();
    this.router.navigate(['/login']);
  }



  evaluarModo() {
    if (this.itemId != 0) {
      this.modo = 1;
      this.obtenerDatosUno();
    } else this.obtenerDatosTodos();
  }

  obtenerDatosUno() {
    this._itemService.getItem(this.itemId).subscribe({
      next: (data) => {
        this.listItems.push(data);
        // Obtener el producto
        this._productoService.getProducto(data.productoId).subscribe({
          next: (data) => {
            this.listProductos.push(data);
            this.loading = false;
            this.calcularPrecios();
          },
          error: (e) => alert("Oops! Ha ocurrido un error. Por favor, recarga la página."),
        });
      },
      error: (e) => alert("Oops! Ha ocurrido un error. Por favor, recarga la página."),
    });
  }

  obtenerDatosTodos() {
    this._itemService.getItems().subscribe({
      next: (data) => {
        const productoObservables = data
          .filter((i) => i.estadoId === 1 && i.usuarioId === this.currentUser!.usuarioId)
          .map((i) => this._productoService.getProducto(i.productoId));

        forkJoin(productoObservables).subscribe({
          next: (productos) => {
            productos.forEach((producto) => this.listProductos.push(producto));
            this.listItems = data.filter((i) => i.estadoId === 1 && i.usuarioId === this.currentUser!.usuarioId);
            this.loading = false;
            this.calcularPrecios();
          },
          error: (e) => alert("Oops! Ha ocurrido un error. Por favor, recarga la página."),
        });
      },
      error: (e) => alert("Oops! Ha ocurrido un error. Por favor, recarga la página."),
    });
  }

  calcularPrecios() {
    this.listProductos.forEach((p) => {
      this.total += p.precioAntes;
    });
  }

  comprarProductos() {
    let contador = 0;
    let respuesta = window.confirm("¿Está seguro que desea continuar?");
    if (respuesta) {
      let orden : Orden = this.obtenerDatosOrden();
      this._ordenService.addOrden(orden).subscribe({
        next: (data) => {
          this.listItems.forEach((item) => {
            this.listProductos.forEach((producto) =>{
              if(item.productoId == producto.productoId && item.usuarioId == this.currentUser!.usuarioId){
                let itemTemp : Item = item;
                itemTemp.ordenId = data.ordenId;
                this._itemService.updateItem(item.itemId!, itemTemp).subscribe({
                  next: (data) => {
                    contador++;
                    if(contador == this.listItems.length){
                      this._snackBarService.mostrarMensaje("Compra realizada exitosamente!");
                      this.router.navigate(['/my-games']);
                    }
                  }
                });
              }
            });
          });
          
        },
        error: (e) => alert("Oops! Ha ocurrido un error. Por favor, recarga la página."),
      });
    }
  }

  private obtenerDatosOrden() : Orden {
      const orden: Orden = {
        nombre: this.form.value.nombre,
        apellido: this.form.value.apellido,
        email: this.form.value.correo,
        costoEnvio: 0,
        total: this.total,
        direccion1: this.form.value.direccion,
        estadoId: 1,
        usuarioId: this.currentUser!.usuarioId!
      }
      return orden;
  }




}
