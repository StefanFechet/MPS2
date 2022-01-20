import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {ClassroomService} from 'src/app/core/services/classroom.service';

declare const $: any;

@Component({
  selector: 'app-add-new-classroom',
  templateUrl: './add-new-classroom.component.html',
  styleUrls: ['./add-new-classroom.component.scss']
})
export class AddNewClassroomComponent implements OnInit, OnDestroy {

  @Input() events: Observable<any>;
  public classroomName;
  public form: FormGroup;
  private eventsSubscription: Subscription = new Subscription();
  tableData = [];

  constructor(
    public formBuilder: FormBuilder,
    private classroomService: ClassroomService,
  ) {
  }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe((data) => {
      this.showModal();
    });
    this.initForm();
  }

  public initForm(): void {
    this.form = this.formBuilder.group({
      classroom_name: ['', [Validators.required]],
      faculty: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  public addClassroom(): void {

    this.classroomService
      .addClassroom(
        this.form.value.classroom_name,
        this.form.value.faculty,
        this.form.value.description
      )
      .subscribe();
    this.hideModal();
    this.setData();
  }

  private setData(): void {
    this.classroomService.getClassrooms().subscribe(data => {
      data.forEach(classroom => {
        this.tableData.push(classroom);
      });
    });
  }

  public showModal(): void {
    $('#addClassroomModal').appendTo('body').modal('show');
    this.initForm();
  }

  public hideModal(): void {
    $('#addClassroomModal').modal('hide');
  }

  ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe();
    this.setData();
  }

}
