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
  activeDayIsOpen = true;
  @ViewChild('divClick') divClick: ElementRef;
  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
    this.authService.getUsers().subscribe(data => {
      this.users = data;
    });
    // setTimeout(() => {
    //   this.divClick.nativeElement.click();
    // }, 200);
    // const element: HTMLElement = document.getElementById('divClick') as HTMLElement;
    // element.click();
    console.log(this.events);
    console.log(this.events.length);
  }

  private setData(): void {
    this.classroomService.getClassrooms().subscribe(async data => {
      data.forEach(classroom => {
        this.classroomService.getClassroomHistory(classroom.id).subscribe(async data => {
          data.forEach(historyData => {
            historyData.start = new Date(historyData.start);
            historyData.title = classroom.nume + ' - ' + historyData.motiv;
            historyData.end = new Date(historyData.finish);
            if (historyData.end > new Date()) {
              historyData.color = colors.red;
            } else {
              historyData.color = colors.yellow;
            }
            this.events.push(historyData);
          });
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

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
