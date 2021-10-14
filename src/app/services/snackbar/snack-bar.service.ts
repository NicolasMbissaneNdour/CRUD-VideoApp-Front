import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private matSnackBar: MatSnackBar) { }

  public async show(message: String,color: String) {
    const matConfig = new MatSnackBarConfig();
    matConfig.duration = 5000;
    matConfig.panelClass = ['mat-toolbar', `${color}`];
    this.matSnackBar.open(`${message}`,undefined,matConfig);
  }
}
