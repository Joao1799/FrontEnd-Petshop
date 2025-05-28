import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarServiceComponent } from './calendar-service.component';

describe('CalendarServiceComponent', () => {
  let component: CalendarServiceComponent;
  let fixture: ComponentFixture<CalendarServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
