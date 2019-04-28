import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogopantnerComponent } from './logopantner.component';

describe('LogopantnerComponent', () => {
  let component: LogopantnerComponent;
  let fixture: ComponentFixture<LogopantnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogopantnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogopantnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
