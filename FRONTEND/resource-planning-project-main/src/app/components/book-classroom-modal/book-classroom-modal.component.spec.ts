import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BookClassroomModalComponent} from './book-classroom-modal.component';

describe('BookClassroomModalComponent', () => {
  let component: BookClassroomModalComponent;
  let fixture: ComponentFixture<BookClassroomModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookClassroomModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookClassroomModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
