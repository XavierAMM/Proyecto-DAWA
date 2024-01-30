import { Component, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/Producto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Usuario } from '../../interfaces/Usuario';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent  implements OnDestroy {
  currentUser?: Usuario;
  private userSubscription: Subscription;
  constructor(private router: Router, private ProdcutosService: ProductoService, private _userService : UserService) {
    this.userSubscription = this._userService.currentUser$.subscribe((user) => {
      this.currentUser = user!;
    });
    this.llenadoLista();
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
  cerrarSesion() {
    this._userService.singOff();
    this.router.navigate(['/login']);
  }
  public listaProductos: Producto[] = [];
  displayedColumns: string[] = ['productoId', 'nombreProducto', 'descripcion', 'stock', 'precioAntes', 'precioHora','opciones'];
    
    private _fb = inject(FormBuilder);

    FormularioAgg: FormGroup = this._fb.group({
      // id: ['', [Validators.required]],
        nombreProducto: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
        stock: ['', [Validators.required]],
        urlImg: ['', [Validators.required]],
        precioHora: ['', [Validators.required]],
        precioAntes: ['', [Validators.required]],
        marcaProductoId: ['', [Validators.required]],
        categoriaProductoId: ['', [Validators.required]],
        estadoId: ['', [Validators.required]],
      });

      FormularioEdit: FormGroup = this._fb.group({
          id: ['', [Validators.required]],
          nombreProducto: ['', [Validators.required]],
          descripcion: ['', [Validators.required]],
          stock: ['', [Validators.required]],
          urlImg: ['', [Validators.required]],
          precioHora: ['', [Validators.required]],
          precioAntes: ['', [Validators.required]],
          marcaProductoId: ['', [Validators.required]],
          categoriaProductoId: ['', [Validators.required]],
          estadoId: ['', [Validators.required]],
        });




    public agg: boolean = false;

    mostrarInterfaz(){
      this.agg = true;
    }

    agregarProdcuto(){
      console.log('entro a agregar');

    if (this.FormularioAgg.valid) {
      
      console.log(this.FormularioAgg.value);

      const producto: Producto = {
        nombreProducto: this.FormularioAgg.value.nombreProducto,
        descripcion: this.FormularioAgg.value.descripcion,
        stock: this.FormularioAgg.value.stock,
        urlImg: this.FormularioAgg.value.urlImg,
        precioHora: this.FormularioAgg.value.precioHora,
        precioAntes: this.FormularioAgg.value.precioAntes,
        marcaProductoId: this.FormularioAgg.value.marcaProductoId,
        categoriaProductoId: this.FormularioAgg.value.categoriaProductoId,
        estadoId: this.FormularioAgg.value.estadoId,
      };

      this.ProdcutosService.addProducto(producto).subscribe({
        next: (data) => {
          console.log('Se creo el registro');
          this.agg = false;
          this.llenadoLista();
        },

        error: (e) => {
          console.log('vales vrg');
        },
      });
      this.FormularioAgg.reset();
    } else {
      console.log('No entro');

      this.FormularioAgg.markAllAsTouched();
      return;
    }

    }

    llenadoLista(){
      this.ProdcutosService.getProductos().subscribe({
        next: (data) => (this.listaProductos = data),
        error: (e) => {
          console.log('valio');
        },
      });
    }

    valido(campo: string) {
      return (
        this.FormularioAgg.get(campo)?.invalid && this.FormularioAgg.get(campo)?.touched
      );
    }

    eliminar(id: number) {
      console.log(id);
  
      this.ProdcutosService.deleteProducto(id).subscribe({
        next: () => {
          console.log('se elimina');
  
          this.llenadoLista();
        },
      });
    }


    public edit: boolean = false;
    
    editar(elemento: any) {
      this.FormularioEdit.get('id')?.setValue(elemento.productoId);
      this.FormularioEdit.get('nombreProducto')?.setValue(elemento.nombreProducto);
      this.FormularioEdit.get('descripcion')?.setValue(elemento.descripcion);
      this.FormularioEdit.get('stock')?.setValue(elemento.stock);
      this.FormularioEdit.get('urlImg')?.setValue(elemento.urlImg);
      this.FormularioEdit.get('precioHora')?.setValue(elemento.precioHora);
      this.FormularioEdit.get('precioAntes')?.setValue(elemento.precioAntes);
      this.FormularioEdit.get('marcaProductoId')?.setValue(elemento.marcaProductoId);
      this.FormularioEdit.get('categoriaProductoId')?.setValue(elemento.categoriaProductoId);
      this.FormularioEdit.get('estadoId')?.setValue(elemento.estadoId);
  
      console.log(elemento);
      this.edit = true;
    }

    guardar() {
      const productosNuevo: Producto = {
        productoId: this.FormularioEdit.value.productoId,
        nombreProducto: String(this.FormularioEdit.value.nombreProducto), 
        descripcion: String(this.FormularioEdit.value.descripcion), 
        stock: this.FormularioEdit.value.stock, 
        urlImg: String(this.FormularioEdit.value.urlImg), 
        precioHora: this.FormularioEdit.value.precioHora, 
        precioAntes: this.FormularioEdit.value.precioAntes, 
        marcaProductoId: this.FormularioEdit.value.marcaProductoId,
        categoriaProductoId: this.FormularioEdit.value.categoriaProductoId,
        estadoId: this.FormularioEdit.value.estadoId,
         
      }
  
      console.log(productosNuevo);
      console.log(this.FormularioEdit.value.id);
      
      this.ProdcutosService.updateProducto(this.FormularioEdit.value.id, productosNuevo).subscribe({
        next: () => {
          console.log('entro al next');
          this.llenadoLista();
          this.edit = false;
        },

      });
      //console.log(this.FormularioEdit.value);
    }

}
