import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertistmentComponent } from './advertistment.component';

describe('AdvertistmentComponent', () => {
  let component: AdvertistmentComponent;
  let fixture: ComponentFixture<AdvertistmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertistmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertistmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
