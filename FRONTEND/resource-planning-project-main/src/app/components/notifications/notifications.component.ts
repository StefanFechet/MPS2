import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {SnackbarService} from '../../core/services/snackbar.service';
import {AuthService} from '../../core/services/auth.service';
import {NotificationsService} from '../../core/services/notifications.service';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationsComponent implements OnInit {

  public tab = 'notifications';
  public notificationsNumber = -1;
  currentUser;
  notificationTable = [];
  nrUnreadNotifications: number;
  constructor(
    public router: Router,
    private snackBar: SnackbarService,
    private authService: AuthService,
    private notificationService: NotificationsService
  ) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
    this.getNotifications();
  }

  getNotifications(): void {
    this.notificationService.getNotificationsById(this.currentUser.id).subscribe(data => {
      this.notificationTable = data;
      const unreadNotifications = this.notificationTable.filter((notification:
                                                           { citit: boolean; }) => notification.citit === false);
      this.nrUnreadNotifications = unreadNotifications.length;
      this.notificationsNumber = this.nrUnreadNotifications;
    });
  }

  markRead(id: string): void {
    this.notificationService.markReadNotification(id).subscribe(() => {
      this.getNotifications();
    });
    window.location.reload();
  }

  deleteNotification(id: string): void {
    this.notificationService.deleteNotification(id).subscribe(() => {
      this.getNotifications();
    });
    window.location.reload();
  }

}
