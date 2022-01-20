import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewClassroomComponent } from './add-new-classroom.component';

describe('AddNewClassroomComponent', () => {
  let component: AddNewClassroomComponent;
  let fixture: ComponentFixture<AddNewClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewClassroomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
