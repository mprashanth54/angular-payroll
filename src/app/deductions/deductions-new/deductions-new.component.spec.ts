import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductionsNewComponent } from './deductions-new.component';

describe('DeductionsNewComponent', () => {
  let component: DeductionsNewComponent;
  let fixture: ComponentFixture<DeductionsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeductionsNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeductionsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
