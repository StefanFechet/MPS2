import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {SnackbarService} from '../../core/services/snackbar.service';
import {AuthService} from '../../core/services/auth.service';
import {ClassroomService} from '../../core/services/classroom.service';
import {NotificationsService} from '../../core/services/notifications.service';
import {faCalendarAlt, faHistory} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-classroom-table',
  templateUrl: './classroom-table.component.html',
  styleUrls: ['./classroom-table.component.scss']
})
export class ClassroomTableComponent implements OnInit {

  public faHistory = faHistory;
  public faCalendarAlt = faCalendarAlt;
  public openHistoryModalSubject: Subject<any> = new Subject<any>();
  public openBookingModalSubject: Subject<any> = new Subject<any>();
  public tab = 'dashboard';
  public tableData = [];
  public currentUser;

  constructor(
    public router: Router,
    private snackBar: SnackbarService,
    private authService: AuthService,
    private classroomService: ClassroomService,
    private notificationsService: NotificationsService
  ) {
  }

  ngOnInit(): void {
    this.setData();
    this.currentUser = this.authService.getUser();
  }

  public openHistoryModal(classroomName, id): void {
    this.openHistoryModalSubject.next({classroomName, id});
  }

  public openBookingModal(classroomName, id): void {
    this.openBookingModalSubject.next({classroomName, id});
  }

  public abonareNotificari(classroomId, id): void {
    this.notificationsService.subscribeNotificari(parseInt(classroomId, 10), parseInt(id, 10)).subscribe();
  }

  private setData(): void {
    this.classroomService.getClassrooms().subscribe(data => {
      data.forEach(classroom => {
        this.tableData.push(classroom);
      });
    });
  }

}
