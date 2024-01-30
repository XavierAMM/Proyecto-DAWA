import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { EstadoRequest } from '../interfaces/Estado';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  private endpoint : string = environment.endpoint;
  private ApiUrl: string = "/api/Estados/";

  constructor(private http : HttpClient) { }

  getEstados() : Observable<EstadoRequest[]>{
    return this.http.get<EstadoRequest[]>(this.endpoint + this.ApiUrl);
  }

  getEstado(id : number) : Observable<EstadoRequest>{
    return this.http.get<EstadoRequest>(this.endpoint + this.ApiUrl + id);
  }

  deleteEstado(id: number) : Observable<void>{
    return this.http.delete<void>(this.endpoint + this.ApiUrl + id);
  }

  addEstado(item : EstadoRequest) : Observable<EstadoRequest>{
    return this.http.post<EstadoRequest>(this.endpoint + this.ApiUrl, item);
  }

  updateEstado(id: number, producto : EstadoRequest) : Observable<void>{
    return this.http.put<void>(this.endpoint + this.ApiUrl + id, producto);
  }
}
