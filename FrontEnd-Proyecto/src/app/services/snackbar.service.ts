import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar : MatSnackBar) { }

  mostrarMensaje(mensaje : string){
    this._snackBar.open(mensaje, "Aceptar",{
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }
}
