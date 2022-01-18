import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SnackbarService} from '../../core/services/snackbar.service';
import {AuthService} from '../../core/services/auth.service';

interface Role {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  roles: Role[] = [
    {value: 0, viewValue: 'student'},
    {value: 1, viewValue: 'profesor'},
  ];
  public selected = 0;
  public signupForm: FormGroup;
  public hidePassword = true;
  public hideConfirmPassword = true;
  private users = [];

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private snackBar: SnackbarService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getUsers();
  }

  public initForm(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
    });
  }

  public getUsers(): void {
    this.authService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  public registerUser(): void {
    let userExists = false;
    if (
        this.signupForm.value.email !== null &&
        this.signupForm.value.password != null &&
        this.signupForm.value.confirm_password !== null &&
        this.signupForm.value.first_name !== null &&
        this.signupForm.value.last_name !== null
      ) {
        if (this.signupForm.value.confirm_password !== this.signupForm.value.password) {
          this.snackBar.openSnackBar('Please make sure your passwords match', 'error-snackbar');
        } else {
          this.users.forEach(user => {
            if (this.signupForm.value.email === user.mail) {
              userExists = true;
            }
          });
          if (userExists) {
            this.snackBar.openSnackBar('An account with the given email already exists', 'error-snackbar');
          } else {
            this.authService.registerUser(this.signupForm.value.last_name, this.signupForm.value.first_name,
              this.selected, this.signupForm.value.email, this.signupForm.value.password).subscribe((data) => {
              console.log(data);
            });
            this.router.navigate(['']);
            this.snackBar.openSnackBar('Successfully register!', 'success-snackbar');
          }
        }
      }
  }
}
