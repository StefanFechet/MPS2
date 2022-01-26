import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/core/services/auth.service';
import {ClassroomService} from 'src/app/core/services/classroom.service';
import {SnackbarService} from 'src/app/core/services/snackbar.service';
import { ViewEncapsulation } from '@angular/core';
import {NotificationsService} from '../../core/services/notifications.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  public tab = 'dashboard';
  public notificationsNumber = -1;
  public tableData = [];
  public currentUser;
  notificationTable = [];
  nrUnreadNotifications: number;

  constructor(
    public router: Router,
    private snackBar: SnackbarService,
    private authService: AuthService,
    private classroomService: ClassroomService,
    private notificationService: NotificationsService
  ) {
  }

  ngOnInit(): void {
    this.setData();
    this.currentUser = this.authService.getUser();
    this.getNotifications();
  }

  private setData(): void {
    this.classroomService.getClassrooms().subscribe(data => {
      data.forEach(classroom => {
        this.tableData.push(classroom);
      });
    });
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

}
