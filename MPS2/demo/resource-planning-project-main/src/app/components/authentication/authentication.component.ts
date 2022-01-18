import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/core/services/auth.service';
import {SnackbarService} from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
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
        this.signinForm.value.email === user.mail &&
        this.signinForm.value.password === user.parola
      ) {
        userExists = true;
        currentUser = user;
      }
    });

    if (userExists) {
      this.authService.signIn(currentUser);
      this.router.navigate(['dashboard']);
      this.snackBar.openSnackBar('Successfully logged in!', 'success-snackbar');
    } else {
      this.snackBar.openSnackBar('User doesn\'t exist.', 'error-snackbar');
    }

  }
}
