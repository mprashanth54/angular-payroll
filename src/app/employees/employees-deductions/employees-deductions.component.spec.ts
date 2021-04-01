import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesDeductionsComponent } from './employees-deductions.component';

describe('EmployeesDeductionsComponent', () => {
  let component: EmployeesDeductionsComponent;
  let fixture: ComponentFixture<EmployeesDeductionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesDeductionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesDeductionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
