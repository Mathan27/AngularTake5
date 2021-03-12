import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LendersComponent } from './lenders.component';

describe('LendersComponent', () => {
  let component: LendersComponent;
  let fixture: ComponentFixture<LendersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LendersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
