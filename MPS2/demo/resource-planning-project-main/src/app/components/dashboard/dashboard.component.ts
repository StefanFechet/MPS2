import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/core/services/auth.service';
import {ClassroomService} from 'src/app/core/services/classroom.service';
import {SnackbarService} from 'src/app/core/services/snackbar.service';
import {faCalendarAlt, faHistory} from '@fortawesome/free-solid-svg-icons';
import {Subject} from 'rxjs';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

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
    private classroomService: ClassroomService
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

  private setData(): void {
    this.classroomService.getClassrooms().subscribe(data => {
      data.forEach(classroom => {
        this.tableData.push(classroom);
      });
    });
  }

}
