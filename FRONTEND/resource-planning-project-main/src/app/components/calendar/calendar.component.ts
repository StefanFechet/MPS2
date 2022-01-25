import {
  Component,
  ChangeDetectionStrategy,
  OnInit, ElementRef, ViewChild
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
  ) {
    this.setData();
  }

  public currentUser;
  public tab = 'calendar';
  public tableData = [];
  public classroomData = [];
  public users;
  public classroomName;
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh = new Subject<void>();
  events: CalendarEvent[] = [];
  events1 = [];
  activeDayIsOpen = false;
  @ViewChild('divClick') divClick: ElementRef;
  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
    this.authService.getUsers().subscribe(data => {
      this.users = data;
    });
    console.log(this.events);
    console.log(this.events.length);
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
        this.activeDayIsOpen = !this.activeDayIsOpen;
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

    showBookings(): void {
    this.activeDayIsOpen = true;
  }

}
