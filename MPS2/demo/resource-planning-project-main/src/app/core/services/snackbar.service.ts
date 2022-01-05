import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackBar: MatSnackBar,
  ) {
  }

  public openSnackBar(message: string, className: string): void {
    this.snackBar.open(message, '', {
      duration: 2500,
      panelClass: [className],
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
