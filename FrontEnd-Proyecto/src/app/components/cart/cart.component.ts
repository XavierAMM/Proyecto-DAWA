import { Component, OnDestroy } from '@angular/core';
import { Usuario } from '../../interfaces/Usuario';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Item } from '../../interfaces/Item';
import { Producto } from '../../interfaces/Producto';
import { ItemService } from '../../services/item.service';
import { ProductoService } from '../../services/producto.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnDestroy{
  currentUser? : Usuario;
  listItems : Item[] = []
  listProductos : Producto[] = [];
  listCarritos : Producto[] = [];
  loading : boolean = true;
  private userSubscription: Subscription;

  constructor(private _userService : UserService, 
    private _itemService : ItemService, 
    private _router : Router,
    private _productoService : ProductoService,
    private _snackBarService : SnackbarService,
    private router : Router){
      this.userSubscription = this._userService.currentUser$.subscribe((user) => {
        this.currentUser = user!;
      });
    if(this.evaluarSesionIniciada()){
      this.obtenerItems();
    };
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  cerrarSesion(){
    this._userService.singOff();
    this.router.navigate(['/login']);
  }

  
  evaluarSesionIniciada() : boolean{
    let retorno : boolean = true;
    if(this.currentUser == null){
      this._router.navigate(['/login']);
      retorno = false;
    }
    return retorno;
  }

  comprarUno(idProducto : number) {
    this.listItems.forEach((e)=>{
      if(e.usuarioId == this.currentUser!.usuarioId && e.productoId == idProducto){
        this._router.navigate(['/buy/'+e.itemId]);
      }
    });
    
  }

  eliminarCarrito(productoId: number) {
    this.listItems.forEach((e) =>{
      if(e.productoId == productoId && e.usuarioId == this.currentUser?.usuarioId!){
        this._itemService.deleteItem(e.itemId!).subscribe({
          next: () => {
            this._snackBarService.mostrarMensaje("Eliminado del carrito");
            this.obtenerItems();
          }
        });
      }
    });
    
  }

  obtenerItems(){
    this.listCarritos = [];
    this.listProductos = [];
    this._itemService.getItems().subscribe({
      next: (data) => {
        this.listItems = data;
        this.listItems.forEach((e)=>{
          if(e.estadoId == 1 && e.usuarioId == this.currentUser!.usuarioId){
            if(e.ordenId != null){
              this._productoService.getProducto(e.productoId).subscribe({
                next: (data) => {this.listProductos.push(data); this.loading = false},
                error: (e) => alert("Oops! Ha ocurrido un error. Por favor, recarga la página."),
              });
            }else {
              this._productoService.getProducto(e.productoId).subscribe({
                next: (data) => {this.listCarritos.push(data); this.loading = false},
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
