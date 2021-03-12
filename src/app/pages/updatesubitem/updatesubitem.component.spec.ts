import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesubitemComponent } from './updatesubitem.component';

describe('UpdatesubitemComponent', () => {
  let component: UpdatesubitemComponent;
  let fixture: ComponentFixture<UpdatesubitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatesubitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatesubitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
