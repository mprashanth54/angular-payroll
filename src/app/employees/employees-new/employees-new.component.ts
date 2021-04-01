import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeductionsService } from 'src/app/services/deductions.service';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employees-new',
  templateUrl: './employees-new.component.html',
  styleUrls: ['./employees-new.component.css']
})
export class EmployeesNewComponent implements OnInit {

  dropdownList: any = []
  selectedItems = [];
  dropdownSettings = {};
  newEmpForm: FormGroup;
  employeeID: string
  updateForm = false
  deductions: any = []

  constructor(private fb: FormBuilder, private ds: DeductionsService, private es: EmployeesService, private toastrService: ToastrService, private route: ActivatedRoute) {
    this.dropdownList = [];
    this.dropdownSettings = {
      singleSelection: false,
      text: "Select Deductions",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true
    }

    this.setEmpForm()

  }

  setEmpForm(): void {
    this.newEmpForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      empID: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', [Validators.required, Validators.minLength(2)]],
      salary: [0, [Validators.required, Validators.min(1)]],
      deductions: [[]]
    })
  }

  setDropDownList(): void {
    this.dropdownList = []
    this.deductions.map((deduction) => {
      this.dropdownList.push({
        "id": deduction._id,
        "itemName": deduction.name
      })
    })
  }

  async ngOnInit(): Promise<any> {
    this.deductions = await this.ds.getDeductions().toPromise()
    this.setDropDownList()
    this.route.params.subscribe((val) => {
      if (val['id']) {
        this.employeeID = val['id']
        this.updateForm = true
        this.setEmployee(val['id'])
      }
      else this.updateForm = false

    })
  }

  async setEmployee(id: string): Promise<any> {
    const employee = await this.es.getEmployeeById(id).toPromise()
    this.newEmpForm.setValue({
      name: employee.name,
      empID: employee.empID,
      email: employee.email,
      salary: employee.salary,
      department: employee.department,
      deductions: this.updateSelectedDeductions(employee.deductions)
    })
    this.selectedItems = this.newEmpForm.value.deductions
  }

  updateSelectedDeductions(selected_deductions): void {
    return selected_deductions.map((deduction) => {
      let deduct = this.deductions.find((deduct) => {
        if (deduct._id === deduction)
          return deduct
      })
      return {
        "id": deduct._id,
        "itemName": deduct.name
      }
    })
  }


  async addEmployee(): Promise<any> {
    try {
      const employee = this.newEmpForm.value
      employee.deductions = this.selectedItems.map((item) => { return item.id })
      console.log("Deductions ", employee.deductions)
      if (this.updateForm) {
        await this.es.update(this.employeeID, employee).toPromise()
        this.toastrService.success('Employee ', 'Updated successfully')
      } else {
        await this.es.create(employee).toPromise()
        this.toastrService.success('Employee ', 'created successfully')
      }

    } catch (err) {
      this.toastrService.error('Employee ', 'Invalid Details')
    }

  }

  updateDeductions(val): void {
    console.log(val)
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }

}
