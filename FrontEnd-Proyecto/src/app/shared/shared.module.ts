import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Angular Materials
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // Angular Materials
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule,
    MatTableModule,
    MatTabsModule,
    MatFormFieldModule,
  ],
  exports: [
    // Angular Materials
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule,
    MatTableModule,
    MatTabsModule,
    MatFormFieldModule,
  ]
})
export class SharedModule { }
