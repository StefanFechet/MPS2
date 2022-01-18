import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {SnackbarService} from '../../core/services/snackbar.service';
import {AuthService} from '../../core/services/auth.service';
import {ClassroomService} from '../../core/services/classroom.service';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationsComponent implements OnInit {

  public tab = 'notifications';
  constructor(
    public router: Router,
    private snackBar: SnackbarService,
    private authService: AuthService,
    private classroomService: ClassroomService
  ) {
  }

  ngOnInit(): void {
  }

}
