import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SnackbarService} from "../../core/services/snackbar.service";
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public signinForm: FormGroup;
  public hidePassword = true;
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
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  public getUsers(): void {
    this.authService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  public loginUser(): void {
    let userExists = false;
    let currentUser;

    this.users.forEach(user => {
      if (
        this.signinForm.value.email == user.mail &&
        this.signinForm.value.password == user.parola
      ) {
        userExists = true;
        currentUser = user;
      }
    })

    if (userExists) {
      this.authService.signIn(currentUser);
      this.router.navigate(['dashboard']);
      this.snackBar.openSnackBar('Successfully logged in!', 'success-snackbar');
    } else {
      this.snackBar.openSnackBar("User doesn't exist.", 'error-snackbar');
    }
  }
}
