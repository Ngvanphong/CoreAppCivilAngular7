import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuntionComponent } from './funtion.component';

describe('FuntionComponent', () => {
  let component: FuntionComponent;
  let fixture: ComponentFixture<FuntionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuntionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuntionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
