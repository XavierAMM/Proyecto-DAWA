import { Component, OnDestroy, inject } from '@angular/core';
import { Usuario } from '../../interfaces/Usuario';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { EstadoService } from '../../services/estado.service';
import { EstadoRequest } from '../../interfaces/Estado';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-status',
  templateUrl: './list-status.component.html',
  styleUrl: './list-status.component.css'
})
export class ListStatusComponent implements OnDestroy {

  currentUser? : Usuario;
  private userSubscription: Subscription;

  constructor(private router: Router, private EstadoService: EstadoService, private _userService: UserService) {
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





  public listaEstado: EstadoRequest[] = [];
  displayedColumns: string[] = ['Id', 'Descripcion', 'Opciones'];

  private _fb = inject(FormBuilder);

  Formulario: FormGroup = this._fb.group({
    id: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
  });
  
  FormularioAgg: FormGroup = this._fb.group({
  // id: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
  });

  

  agregarDescripcion() {
    console.log('entro a agregar');

    if (this.FormularioAgg.valid) {
      console.log(this.FormularioAgg.value);

      const estado: EstadoRequest = {
        descripcion: this.FormularioAgg.value.descripcion,
      };

      this.EstadoService.addEstado(estado).subscribe({
        next: (data) => {
          console.log('Se creo el registro');
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

  llenadoLista() {
    this.EstadoService.getEstados().subscribe({
      next: (data) => (this.listaEstado = data),
      error: (e) => {
        console.log('valio');
      },
    });
  }

  // limpiar(){
  //   //this.RegistrarEstado.reset();
  //   console.log("Entroo")
  // }

  public edit: boolean = false;

  editar(elemento: any) {
    this.Formulario.get('descripcion')?.setValue(elemento.descripcion);
    this.Formulario.get('id')?.setValue(elemento.estadoId);

    console.log(elemento);
    this.edit = true;
  }

  eliminar(id: number) {
    console.log(id);

    this.EstadoService.deleteEstado(id).subscribe({
      next: () => {
        console.log('se elimina');

        this.llenadoLista();
      },
    });
  }

  valido(campo: string) {
    return (
      this.FormularioAgg.get(campo)?.invalid && this.FormularioAgg.get(campo)?.touched
    );
  }

  guardar() {

    const estadoNuevo: EstadoRequest = {descripcion: this.Formulario.value.descripcion, estadoId: this.Formulario.value.id}

    console.log(estadoNuevo);
    console.log(this.Formulario.value.id);
    
    this.EstadoService.updateEstado(this.Formulario.value.id, estadoNuevo).subscribe({
      next: () => {
        console.log('entro al next');
        this.llenadoLista();
        this.edit = false;
      },
    });
    console.log(this.Formulario.value);
  }
}
