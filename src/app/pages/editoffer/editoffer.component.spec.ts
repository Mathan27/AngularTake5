import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditofferComponent } from './editoffer.component';

describe('EditofferComponent', () => {
  let component: EditofferComponent;
  let fixture: ComponentFixture<EditofferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditofferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
