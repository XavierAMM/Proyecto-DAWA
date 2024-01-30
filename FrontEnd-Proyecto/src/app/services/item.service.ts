import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Item } from '../interfaces/Item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private endpoint : string = environment.endpoint;
  private ApiUrl: string = "/api/Items/";

  constructor(private http : HttpClient) { }

  getItems() : Observable<Item[]>{
    return this.http.get<Item[]>(this.endpoint + this.ApiUrl);
  }

  getItem(id : number) : Observable<Item>{
    return this.http.get<Item>(this.endpoint + this.ApiUrl + id);
  }

  deleteItem(id: number) : Observable<void>{
    return this.http.delete<void>(this.endpoint + this.ApiUrl + id);
  }

  addItem(item : Item) : Observable<Item>{
    return this.http.post<Item>(this.endpoint + this.ApiUrl, item);
  }

  updateItem(id: number, producto : Item) : Observable<void>{
    return this.http.put<void>(this.endpoint + this.ApiUrl + id, producto);
  }
}
