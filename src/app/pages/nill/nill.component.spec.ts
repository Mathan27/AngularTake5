import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NillComponent } from './nill.component';

describe('NillComponent', () => {
  let component: NillComponent;
  let fixture: ComponentFixture<NillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
