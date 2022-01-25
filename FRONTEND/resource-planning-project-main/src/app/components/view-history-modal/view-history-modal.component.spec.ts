import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewHistoryModalComponent} from './view-history-modal.component';

describe('ViewHistoryModalComponent', () => {
  let component: ViewHistoryModalComponent;
  let fixture: ComponentFixture<ViewHistoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewHistoryModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHistoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
