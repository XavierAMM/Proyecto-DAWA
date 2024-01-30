import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orden } from '../interfaces/Orden';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  private endpoint : string = environment.endpoint;
  private ApiUrl: string = "/api/Orden/";

  constructor(private http : HttpClient) { }

  getOrdenes() : Observable<Orden[]>{
    return this.http.get<Orden[]>(this.endpoint + this.ApiUrl);
  }

  getOrden(id : number) : Observable<Orden>{
    return this.http.get<Orden>(this.endpoint + this.ApiUrl + id);
  }

  deleteOrden(id: number) : Observable<void>{
    return this.http.delete<void>(this.endpoint + this.ApiUrl + id);
  }

  addOrden(orden: Orden) : Observable<Orden>{
    return this.http.post<Orden>(this.endpoint + this.ApiUrl, orden);
  }

  updateOrden(id: number, orden : Orden) : Observable<void>{  
    return this.http.put<void>(this.endpoint + this.ApiUrl + id, orden);
  }

  
}
