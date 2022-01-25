import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {SnackbarService} from '../../core/services/snackbar.service';
import {AuthService} from '../../core/services/auth.service';
import {NotificationsService} from '../../core/services/notifications.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit, OnChanges {
  constructor(
    public router: Router,
    private snackBar: SnackbarService,
    private authService: AuthService,
    private notificationService: NotificationsService
  ) {
  }

  @Input() tab: string;
  public currentUser;
  notificationTable = [];
  nrUnreadNotifications: number;

  ngOnChanges(changes: SimpleChanges): void {
    const tab: SimpleChange = changes.tab;
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
    });
  }

  public doLogout(): void {
    this.authService.logOut();
    this.router.navigate(['']);
    this.snackBar.openSnackBar('Successfully logged out!', 'success-snackbar');
  }

  public goToDashboard(): void {
    if (this.currentUser.nume.includes('admin')) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  public goToCalendar(): void {
    this.router.navigate(['/calendar']);
  }

  public goToNotifications(): void {
    this.router.navigate(['/notifications']);
  }
}
