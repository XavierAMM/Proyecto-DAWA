import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  error : boolean = false;
  FormularioLogin = this.formBuilder.group({
    email: ['Ejemplo@gmail.com', [Validators.required, Validators.email]],
    password: ['', Validators.required]

  })
  constructor(private formBuilder: FormBuilder, private router: Router, private _userService : UserService) { }


  get email() {
    return this.FormularioLogin.controls.email;
  }
  get password() {
    return this.FormularioLogin.controls.password;
  }
  login() {
    this.error = false;
    if (this.FormularioLogin.valid) {
      this._userService.getUsuarios().subscribe({
        next: (data) => {
          data.forEach((u) => {
            if(u.email == this.FormularioLogin.value.email && u.password == this.FormularioLogin.value.password){
              this._userService.loadUser(u);
              this.router.navigateByUrl('/home');
              this.FormularioLogin.reset();
              return;
            }
          });
          // fuera del foreach
          this.error = true;
          this.FormularioLogin.markAsUntouched();
        }
      });
    }else this.FormularioLogin.markAllAsTouched();
  }



  recuperar(){
    this.router.navigateByUrl('/recover-account');
  }

  registrar(){
    this.router.navigateByUrl('/register');
  }




}
