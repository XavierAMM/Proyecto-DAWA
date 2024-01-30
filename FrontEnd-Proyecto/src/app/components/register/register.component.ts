import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Usuario } from '../../interfaces/Usuario';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  FormularioRegistro = this.formBuilder.group({
    nombre: ['', Validators.required,],
    apellido: ['', Validators.required],
    email: ['Ejemplo@gmail.com',[Validators.required,Validators.email]],
    password: ['', Validators.required],

  })
  constructor(private formBuilder: FormBuilder, private router: Router, private registroService: UserService, private _snackBarService : SnackbarService) { }


  get nombre() {
    return this.FormularioRegistro.controls.nombre;
  }
  get apellido() {
    return this.FormularioRegistro.controls.apellido;
  }
  get email() {
    return this.FormularioRegistro.controls.email;
  }
  get password() {
    return this.FormularioRegistro.controls.password;
  }

  registro() {
    console.log(this.FormularioRegistro.value);
    

    if (this.FormularioRegistro.valid) {
      console.log(this.FormularioRegistro.value);
      const registro: Usuario = {
        nombre: String(this.FormularioRegistro.value.nombre),
        apellido: String(this.FormularioRegistro.value.apellido),
        email: String(this.FormularioRegistro.value.email),
        password: String(this.FormularioRegistro.value.password)
      };
      this.registroService.addUsuario(registro).subscribe({
        next: (data) => {
            this._snackBarService.mostrarMensaje("Usuario creado con éxito");
            this.router.navigate(['/home']);
        }
      });
      this.FormularioRegistro.reset();
    }
    else {
      this.FormularioRegistro.markAllAsTouched();
    }
  }
  cancelarRegistro() {
    console.log("LLama al servico");
    this.router.navigateByUrl('/login');
    this.FormularioRegistro.reset();
  }


}
