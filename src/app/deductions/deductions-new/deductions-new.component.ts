import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeductionsService } from 'src/app/services/deductions.service';

@Component({
  selector: 'app-deductions-new',
  templateUrl: './deductions-new.component.html',
  styleUrls: ['./deductions-new.component.css']
})
export class DeductionsNewComponent implements OnInit {

  deductionType: string = '%'
  deductionForm: FormGroup
  deductionID: string
  updateForm = false

  constructor(private fb: FormBuilder, private ds: DeductionsService, private toastrService: ToastrService, private route: ActivatedRoute) {
    this.setForm()
    this.updateForm = false
  }

  setForm(): void {
    this.deductionForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      value: [0, [Validators.required, Validators.min(0)]],
      type: ['percent', Validators.required]
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      if (val['id']) {
        this.deductionID = val['id']
        this.updateForm = true
        this.setDeduction(val['id'])
      }
      else this.updateForm = false

    })
  }

  async setDeduction(id: string): Promise<any> {
    const data = await this.ds.getDeductionById(id).toPromise()
    this.deductionForm.setValue({
      name: data.name,
      value: data.value,
      type: data.type
    })
    this.deductionType = (data.type === 'percent') ? '%' : '$'
  }

  updateType(val: string): void {
    this.deductionForm.patchValue({ type: val })
    this.deductionType = (val === 'percent') ? '%' : '$'
  }

  async addDeduction(): Promise<any> {
    try {
      const deduction = this.deductionForm.value
      if (this.updateForm) {
        await this.ds.update(this.deductionID, deduction).toPromise()
        this.toastrService.success('Deduction ', 'Updated successfully')
      } else {
        await this.ds.create(deduction).toPromise()
        this.toastrService.success('Deduction ', 'created successfully')
      }
    } catch (err) {
      this.toastrService.error('Deduction ', JSON.stringify(err))
    }

  }
}
