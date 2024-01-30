import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-c-password',
  templateUrl: './c-password.component.html',
  styleUrl: './c-password.component.css'
})
export class CPasswordComponent {

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  FormularioCPassword = this.formBuilder.group({
    password: ['', Validators.required]
  })

  get password() {
    return this.FormularioCPassword.controls.password;
  }

  cambiarBtnPassword() {
    if (this.FormularioCPassword.valid) {
      this.userService.getUsuarios().subscribe({
        next: (data) => {
          this.router.navigateByUrl('/home');
          this.FormularioCPassword.reset();
        }
      });

    }
    else {
      this.FormularioCPassword.markAllAsTouched();
      // alert("Error al ingresar los datos");
    }
  }

}
