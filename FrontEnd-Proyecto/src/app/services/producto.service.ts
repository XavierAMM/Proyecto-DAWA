import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private endpoint : string = environment.endpoint;
  private ApiUrl: string = "/api/Producto/";

  constructor(private http : HttpClient) { }

  getProductos() : Observable<Producto[]>{
    return this.http.get<Producto[]>(this.endpoint + this.ApiUrl);
  }

  getProducto(id : number) : Observable<Producto>{
    return this.http.get<Producto>(this.endpoint + this.ApiUrl + id);
  }

  deleteProducto(id: number) : Observable<void>{
    return this.http.delete<void>(this.endpoint + this.ApiUrl + id);
  }

  addProducto(producto : Producto) : Observable<Producto>{
    return this.http.post<Producto>(this.endpoint + this.ApiUrl, producto);
  }

  updateProducto(id: number, producto : Producto) : Observable<void>{
    return this.http.put<void>(this.endpoint + this.ApiUrl + id, producto);
  }
}
