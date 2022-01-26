import {
  Component,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import {
  isSameDay,
  isSameMonth,
} from 'date-fns';
import {Subject} from 'rxjs';
import {
  CalendarEvent,
  CalendarView,
} from 'angular-calendar';
import {Router} from '@angular/router';
import {SnackbarService} from '../../core/services/snackbar.service';
import {AuthService} from '../../core/services/auth.service';
import {ClassroomService} from '../../core/services/classroom.service';
import {NotificationsService} from '../../core/services/notifications.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#0093b9',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {

  constructor(
    public router: Router,
    private snackBar: SnackbarService,
    private authService: AuthService,
    private classroomService: ClassroomService,
    private notificationService: NotificationsService
  ) {
    this.currentUser = this.authService.getUser();
    this.getNotifications();
    this.setData();
  }

  public currentUser;
  public tab = 'calendar';
  public notificationsNumber = -1;
  notificationTable = [];
  nrUnreadNotifications: number;
  public tableData = [];
  public classroomData = [];
  public classroomName;
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh = new Subject<void>();
  events: CalendarEvent[] = [];
  events1 = [];
  activeDayIsOpen = false;
  ngOnInit(): void {
  }

  private setData(): void {
    this.classroomService.getHistory().subscribe(data => {
      data.forEach(item => {
        this.events.push({
          start: new Date(item['rezervare']['start']),
          end: new Date(item['rezervare']['finish']),
          title: item['sala']['nume'] + ' - ' + item['rezervare']['motiv'],
          color: (new Date(item['rezervare']['finish']) > new Date()) ? colors.red : colors.yellow
        });
      });
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

    setView(view: CalendarView): void {
    this.view = view;
  }

    closeOpenMonthViewDay(): void {
    this.activeDayIsOpen = false;
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