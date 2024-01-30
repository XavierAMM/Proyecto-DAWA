import { Component, OnDestroy } from '@angular/core';
import { Usuario } from '../../interfaces/Usuario';
import { UserService } from '../../services/user.service';
import { ItemService } from '../../services/item.service';
import { Item } from '../../interfaces/Item';
import { Router } from '@angular/router';
import { Producto } from '../../interfaces/Producto';
import { ProductoService } from '../../services/producto.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.component.html',
  styleUrl: './my-games.component.css'
})
export class MyGamesComponent implements OnDestroy{
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

  obtenerItems(){
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
