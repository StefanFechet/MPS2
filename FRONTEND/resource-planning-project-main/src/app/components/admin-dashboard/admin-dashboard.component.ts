import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {SnackbarService} from '../../core/services/snackbar.service';
import {AuthService} from '../../core/services/auth.service';
import {ClassroomService} from '../../core/services/classroom.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  public openAddingClassroomModalSubject: Subject<any> = new Subject<any>();
  public tab = 'dashboard';
  public tableData = [];
  public currentUser;

  constructor(
    public router: Router,
    private snackBar: SnackbarService,
    private authService: AuthService,
    private classroomService: ClassroomService,
  ) {
  }

  ngOnInit(): void {
    this.setData();
    this.currentUser = this.authService.getUser();
  }

  public openAddingClassroomModal(): void {
    this.openAddingClassroomModalSubject.next({});
  }

  private setData(): void {
    this.classroomService.getClassrooms().subscribe(data => {
      data.forEach(classroom => {
        this.tableData.push(classroom);
      });
    });
  }

}
