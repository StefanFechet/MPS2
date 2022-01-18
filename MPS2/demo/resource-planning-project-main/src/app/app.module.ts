import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
// import { MatDatepickerModule } from '@angular/material/datepicker';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {HttpClientModule} from '@angular/common/http';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDividerModule} from '@angular/material/divider';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthenticationComponent} from './components/authentication/authentication.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ViewHistoryModalComponent} from './components/view-history-modal/view-history-modal.component';
import {BookClassroomModalComponent} from './components/book-classroom-modal/book-classroom-modal.component';
import { RegistrationComponent } from './components/registration/registration.component';
import {MatSelectModule} from '@angular/material/select';
import { CalendarComponent } from './components/calendar/calendar.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    DashboardComponent,
    ViewHistoryModalComponent,
    BookClassroomModalComponent,
    RegistrationComponent,
    CalendarComponent,
    NotificationsComponent,
    SidemenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    HttpClientModule,
    FontAwesomeModule,
    MatTooltipModule,
    MatSelectModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatDividerModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
