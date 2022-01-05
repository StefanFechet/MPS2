import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {AuthService} from 'src/app/core/services/auth.service';
import {ClassroomService} from 'src/app/core/services/classroom.service';
import {DatePipe} from '@angular/common'

declare const $: any;

@Component({
  selector: 'app-book-classroom-modal',
  templateUrl: './book-classroom-modal.component.html',
  styleUrls: ['./book-classroom-modal.component.scss']
})
export class BookClassroomModalComponent implements OnInit {
  @Input() events: Observable<any>;
  public classroomName;
  public form: FormGroup;
  private eventsSubscription: Subscription = new Subscription();
  private classroomId;
  private userId;

  constructor(
    public formBuilder: FormBuilder,
    private classroomService: ClassroomService,
    private authService: AuthService,
    public datepipe: DatePipe
  ) {
  }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe((data) => {
      this.classroomName = data.classroomName;
      this.classroomId = data.id;
      this.showModal();
    });
    this.userId = this.authService.getUserId();
    this.initForm();
  }

  public initForm() {
    this.form = this.formBuilder.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      reason: ['', [Validators.required]]
    });
  }

  public bookClassroom() {
    let latest_date = this.datepipe.transform(this.form.value.startDate, 'yyyy-MM-dd HH:mm:ss');
    let latest_date2 = this.datepipe.transform(this.form.value.endDate, 'yyyy-MM-dd HH:mm:ss');

    this.classroomService
      .bookClassroom(
        this.classroomId,
        this.userId,
        latest_date,
        latest_date2,
        this.form.value.reason
      )
      .subscribe((data) => {
        console.log(data);
      });
    this.hideModal();
  }

  public showModal(): void {
    $('#bookClassroomModal').appendTo('body').modal('show');
    this.initForm();
  }

  public hideModal(): void {
    $('#bookClassroomModal').modal('hide');
  }

  ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe();
  }

}
