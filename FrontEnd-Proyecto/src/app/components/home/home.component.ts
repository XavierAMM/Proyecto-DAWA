import { Component, OnDestroy } from '@angular/core';
import { Usuario } from '../../interfaces/Usuario';
import { UserService } from '../../services/user.service';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/Producto';
import { ItemService } from '../../services/item.service';
import { Item } from '../../interfaces/Item';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnDestroy {
  currentUser?: Usuario;
  listProductos: Producto[] = [];
  listItems: Item[] = [];
  error: boolean = false;
  private userSubscription: Subscription;

  constructor(
    private _userService: UserService,
    private _productoService: ProductoService,
    private _itemService: ItemService,
    private _snackBarService: SnackbarService,
    private router: Router) {
    this.userSubscription = this._userService.currentUser$.subscribe((user) => {
      this.currentUser = user!;
    });
    this.obtenerProductos();
    this.obtenerItems();
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  obtenerProductos() {
    this._productoService.getProductos().subscribe({
      next: (data) => this.listProductos = data,
      error: (e) => {
        this.error = true;
        alert("Oops! Ha ocurrido un error. Por favor, recargue la página.");
      }
    });
  }

  obtenerItems() {
    this._itemService.getItems().subscribe({
      next: (data) => this.listItems = data,
      error: (e) => {
        this.error = true;
        alert("Oops! Ha ocurrido un error. Por favor, recargue la página.\n" + e);
      }
    });
  }

  agregarCarrito(productoId: number) {
    if (this.currentUser != null) {
      const item: Item = {
        cantidad: 1,
        usuarioId: this.currentUser.usuarioId!,
        productoId: productoId,
        ordenId: null!,
        estadoId: 1,
      }
      this._itemService.addItem(item).subscribe({
        next: (data) => {
          this._snackBarService.mostrarMensaje("Producto añadido al carrito!");
          this.obtenerItems();
        },
        error: (e) => alert("Oops! Ha ocurrido un error. Por favor, recargue la página."),
      });

    } else this.router.navigate(['/login']);

  }

  eliminarCarrito(productoId: number) {
    this.listItems.forEach((e) => {
      if (e.productoId == productoId && e.usuarioId == this.currentUser?.usuarioId!) {
        this._itemService.deleteItem(e.itemId!).subscribe({
          next: () => {
            this._snackBarService.mostrarMensaje("Eliminado del carrito");
            this.obtenerItems();
          }
        });
      }
    });

  }

  existeProductoIdEnListaItems(productoId: number): number {
    // 0 = no se ha añadido al carrito, 1 = está en carrito, 2 = comprado
    let retorno: number = 0;
    if (this.listItems.length > 0) {
      this.listItems.forEach((e) => {
        if (e.productoId == productoId && e.usuarioId == this.currentUser?.usuarioId) {
          if (e.ordenId == null) retorno = 1;
          else retorno = 2
        }
      })
    }
    return retorno;
  }


  cerrarSesion() {
    this._userService.singOff();
    this.router.navigate(['/login']);
  }


}
