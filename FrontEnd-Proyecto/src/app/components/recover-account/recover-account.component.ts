import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-recover-account',
  templateUrl: './recover-account.component.html',
  styleUrl: './recover-account.component.css'
})
export class RecoverAccountComponent {
  FormularioRecuperar = this.formBuilder.group({
    email: ['Ejemplo@gmail.com', [Validators.email, Validators.required]]
  })

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService){}

  get email(){
    return this.FormularioRecuperar.controls.email;
  }

  recuperarBtnAceptar(){
    if (this.FormularioRecuperar.valid) {
      this.router.navigateByUrl('/cambiar-password');
      this.FormularioRecuperar.reset();
    }
    else {
      this.FormularioRecuperar.markAllAsTouched();
      // alert("Error al ingresar los datos");
    }

  }
  recuperarBtnCancelar(){
    this.router.navigateByUrl('/login');
    this.FormularioRecuperar.reset();
  }
  
}
