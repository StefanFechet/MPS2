import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {SnackbarService} from '../../core/services/snackbar.service';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit, OnChanges {

  @Input() tab: string;
  public currentUser;
  public openHistoryModalSubject: Subject<any> = new Subject<any>();
  public openBookingModalSubject: Subject<any> = new Subject<any>();

  ngOnChanges(changes: SimpleChanges) {
    const tab: SimpleChange = changes.tab;
  }

  constructor(
    public router: Router,
    private snackBar: SnackbarService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
  }

  public openHistoryModal(classroomName, id): void {
    this.openHistoryModalSubject.next({classroomName, id});
  }

  public openBookingModal(classroomName, id): void {
    this.openBookingModalSubject.next({classroomName, id});
  }

  public doLogout(): void {
    this.authService.logOut();
    this.router.navigate(['']);
    this.snackBar.openSnackBar('Successfully logged out!', 'success-snackbar');
  }

  public goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  public goToCalendar(): void {
    this.router.navigate(['/calendar']);
  }

  public goToNotifications(): void {
    this.router.navigate(['/notifications']);
  }
}
