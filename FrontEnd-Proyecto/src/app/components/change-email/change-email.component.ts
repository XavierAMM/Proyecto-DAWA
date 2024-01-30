import { Component, OnDestroy } from '@angular/core';
import { Usuario } from '../../interfaces/Usuario';
import { UserService } from '../../services/user.service';
import { Item } from '../../interfaces/Item';
import { Producto } from '../../interfaces/Producto';
import { ItemService } from '../../services/item.service';
import { ProductoService } from '../../services/producto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../services/snackbar.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrl: './change-email.component.css'
})
export class ChangeEmailComponent implements OnDestroy {
  currentUser?: Usuario;
  listItems: Item[] = []
  listProductos: Producto[] = [];
  listCarritos: Producto[] = [];
  loading: boolean = true;
  form!: FormGroup;
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
          nombre: [this.currentUser.nombre, [Validators.required]],
          apellido: [this.currentUser.apellido, [Validators.required]],
          correo: [this.currentUser.email, [Validators.required, Validators.email]],
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


  actualizarDatos() {
    const newUser: Usuario = {
      usuarioId: this.currentUser!.usuarioId,
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      email: this.form.value.correo
    }
    this._userService.updateUsuario(this.currentUser!.usuarioId!, newUser).subscribe({
      next: (data) => {
        this._snackBarService.mostrarMensaje("Datos actualizados con éxito!");
        this._userService.getUsuario(this.currentUser!.usuarioId!).subscribe({
          next: (data) => this._userService.loadUser(data)
        });
      },
      error: (e) => alert("Oops! Ha ocurrido un error. Por favor, recarga la página."),
    });

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

}
