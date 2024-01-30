import { Component, OnDestroy } from '@angular/core';
import { Comentario } from '../../interfaces/Comentario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../interfaces/Usuario';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnDestroy {

  form: FormGroup;
  currentUser?: Usuario;
  private userSubscription: Subscription;

  listComments: Comentario[] = [
    { usuario: 'Angela01 - angela@gmail.com', mensaje: 'Lorem ipsum dolor sit amet 😍, consectetur adipiscing elit. Nunc leo neque, placerat aliquet     pharetra et, bibendum blandit purus. Praesent id elit tristique!!, ullamcorper quam interdum 💯💯, feugiat quam...' },
    { usuario: 'ProGramer777 - juanitoperez@hotmail.com', mensaje: 'Vivamus sem arcu 😡😡 placerat ac gravida sed, vehicula sit amet est???. Nunc eget nunc iaculis justo vehicula cursus. Morbi porttitor libero in augue placerat sollicitudin. 🤬🤬. Nullam nec iaculis ligula...' }
  ];

  constructor(private fb: FormBuilder, private _userService: UserService, private router : Router) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      asunto: ['', Validators.required],
      mensaje: ['', Validators.required]
    });

    this.userSubscription = this._userService.currentUser$.subscribe((user) => {
      this.currentUser = user!;
    });
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
  cerrarSesion() {
    this._userService.singOff();
    this.router.navigate(['/login']);
  }

  agregarComentario() {
    const comentario: Comentario = {
      usuario: this.form.value.nombre + ' - ' + this.form.value.correo,
      mensaje: this.form.value.mensaje,
    }

    this.listComments.push(comentario);
    console.log(comentario);
  }

}
