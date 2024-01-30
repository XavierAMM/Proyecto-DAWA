import { Component, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from '../../interfaces/Usuario';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent implements OnDestroy{
  currentUser?: Usuario;
  private userSubscription: Subscription;
  constructor(
    private router: Router,
    private _userService : UserService
  ) {
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

  public listaUsuario: Usuario[] = [];
  displayedColumns: string[] = [
    'usuarioId',
    'nombre',
    'apellido',
    'email',
    'maxintentos',
    'intentosFallidos',
    'estadoId',
    'rolId',
    'opciones',
  ];

  private _fb = inject(FormBuilder);

  Formulario: FormGroup = this._fb.group({
    id: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    maxintentos: ['', [Validators.required]],
    intentosFallidos: ['', [Validators.required]],
    estadoId: ['', [Validators.required]],
    rolId: ['', [Validators.required]],
  });

  llenadoLista() {
    this._userService.getUsuarios().subscribe({
      next: (data) => {
        console.log(data);
        this.listaUsuario = data;
      },
      error: (e) => {
        console.log('valio');
      },
    });
  }

  eliminar(id: number) {
    console.log(id);

    this._userService.deleteUsuario(id).subscribe({
      next: () => {
        console.log('se elimina');

        this.llenadoLista();
      },
    });
  }

  public edit: boolean = false;

  editar(elemento: any) {
    this.Formulario.get('id')?.setValue(elemento.usuarioId);
    this.Formulario.get('nombre')?.setValue(elemento.nombre);
    this.Formulario.get('apellido')?.setValue(elemento.apellido);
    this.Formulario.get('email')?.setValue(elemento.email);
    this.Formulario.get('password')?.setValue(elemento.password)
    this.Formulario.get('maxintentos')?.setValue(elemento.maxintentos);
    this.Formulario.get('intentosFallidos')?.setValue(elemento.intentosFallidos);
    this.Formulario.get('estadoId')?.setValue(elemento.estadoId);
    this.Formulario.get('rolId')?.setValue(elemento.rolId);

    console.log(elemento);
    this.edit = true;
  }

  guardar(){
    const usuarioNuevo: Usuario = {
      usuarioId: this.Formulario.value.id, 
      nombre: String(this.Formulario.value.nombre),
      apellido: String(this.Formulario.value.apellido),
      email: String(this.Formulario.value.email),
      password: String(this.Formulario.value.password),
    }

    console.log(usuarioNuevo);
    console.log(this.Formulario.value.id);
    
    this._userService.updateUsuario(this.Formulario.value.id, usuarioNuevo).subscribe({
      next: () => {
        console.log('entro al next');
        this.llenadoLista();
        this.edit = false;
        console.log(this.Formulario.value);
      },
  
    });
    
    
  }





}
