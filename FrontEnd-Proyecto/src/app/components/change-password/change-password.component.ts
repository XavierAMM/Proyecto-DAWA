import { Component, OnDestroy } from '@angular/core';
import { Usuario } from '../../interfaces/Usuario';
import { Item } from '../../interfaces/Item';
import { Producto } from '../../interfaces/Producto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { ItemService } from '../../services/item.service';
import { ProductoService } from '../../services/producto.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnDestroy{
  currentUser?: Usuario;
  listItems: Item[] = []
  listProductos: Producto[] = [];
  listCarritos: Producto[] = [];
  loading: boolean = true;
  form!: FormGroup;
  error1: boolean = false;
  error2: boolean = false;
  private userSubscription: Subscription;

  constructor(
    private _userService: UserService,
    private _itemService: ItemService,
    private _productoService: ProductoService,
    private fb: FormBuilder,
    private _snackBarService: SnackbarService,
    private router : Router) {
    this.userSubscription = this._userService.currentUser$.subscribe((user) => {
      this.currentUser = user!;
      if (user) {
        this.currentUser = user;
        this.form = this.fb.group({
          contra_new: ['', [Validators.required]],
          contra_new2: ['', [Validators.required]],
          contra_act: ['', [Validators.required]],
        });
      }      
    });
    this.obtenerItems();    
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
  cerrarSesion() {
    this._userService.singOff();
    this.router.navigate(['/login']);
  }

  evaluarContrasenas(){
    this.error1 = false;
    this.error2 = false;
    const contra_act = this.form.value.contra_act;
    const contra_new = this.form.value.contra_new;
    const contra_new2 = this.form.value.contra_new2;
    if(contra_new2 != contra_new){
      this.error1 = true;
    }
    if(contra_act != this.currentUser!.password){
      this.error2 = true;
    }
    if(!this.error1 && !this.error2) this.actualizarDatos();
  }

  obtenerItems() {
    this._itemService.getItems().subscribe({
      next: (data) => {
        this.listItems = data;
        this.listItems.forEach((e) => {
          if (e.estadoId == 1 && e.usuarioId == this.currentUser!.usuarioId) {
            if (e.ordenId != null) {
              this._productoService.getProducto(e.productoId).subscribe({
                next: (data) => { this.listProductos.push(data); this.loading = false },
                error: (e) => alert("Oops! Ha ocurrido un error. Por favor, recarga la página."),
              });
            } else {
              this._productoService.getProducto(e.productoId).subscribe({
                next: (data) => { this.listCarritos.push(data); this.loading = false },
                error: (e) => alert("Oops! Ha ocurrido un error. Por favor, recarga la página."),
              });
            }
          }


        });
      },
      error: (e) => alert("Oops! Ha ocurrido un error. Por favor, recarga la página."),
    });

  }


  actualizarDatos() {
    const newUser: Usuario = {
      usuarioId: this.currentUser!.usuarioId,
      nombre: this.currentUser!.nombre,
      apellido: this.currentUser!.apellido,
      email: this.currentUser!.email,
      password: this.form.value.contra_new
    }
    this._userService.updateUsuario(this.currentUser!.usuarioId!, newUser).subscribe({
      next: (data) => {
        this._snackBarService.mostrarMensaje("Datos actualizados con éxito!");
        this._userService.getUsuario(this.currentUser!.usuarioId!).subscribe({
          next: (data) => {this._userService.loadUser(data); this.form.reset()}

        });
      },
      error: (e) => alert("Oops! Ha ocurrido un error. Por favor, recarga la página."),
    });

  }
}
