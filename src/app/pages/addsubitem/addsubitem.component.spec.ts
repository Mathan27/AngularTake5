import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsubitemComponent } from './addsubitem.component';

describe('AddsubitemComponent', () => {
  let component: AddsubitemComponent;
  let fixture: ComponentFixture<AddsubitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsubitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsubitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
