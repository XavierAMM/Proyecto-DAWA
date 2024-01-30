import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/Usuario';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject: ReplaySubject<Usuario | null> = new ReplaySubject<Usuario | null>(1);
  private currentUser: Usuario | null = null;
  public currentUser$: Observable<Usuario | null> = this.currentUserSubject.asObservable();

  //public currentUser? : Usuario;
  private endpoint: string = environment.endpoint;
  private ApiUrl: string = "/api/Usuario/";

  constructor(private http: HttpClient) {
    this.getUsuario(1).subscribe({
      next: (data) => this.loadUser(data)
    });
  }

  public singOff() {
    //this.currentUser = undefined;
    this.currentUser = null;
    this.currentUserSubject.next(null);
  }

  public loadUser(user: Usuario){//(id: number) {
    this.currentUser = user;
    this.currentUserSubject.next(user);
    // this.getUsuario(id).subscribe({
    //   next: (data) => {
    //     this.currentUserSubject.next(data);
    //     //this.currentUser = data;
    //   },
    //   error: (e) => alert("Oops! Ha ocurrido un error. Por favor póngase en contacto con un administrador."),
    // });
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.endpoint + this.ApiUrl);
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(this.endpoint + this.ApiUrl + id);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(this.endpoint + this.ApiUrl + id);
  }

  addUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.endpoint + this.ApiUrl, usuario);
  }

  updateUsuario(id: number, usuario: Usuario): Observable<void> {
    return this.http.put<void>(this.endpoint + this.ApiUrl + id, usuario);
  }
}
