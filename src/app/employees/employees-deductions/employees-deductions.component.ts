import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employees-deductions',
  templateUrl: './employees-deductions.component.html',
  styleUrls: ['./employees-deductions.component.css']
})
export class EmployeesDeductionsComponent implements OnInit {

  orgInfo: any = {
    name: '',
    address: {
      street: '',
      country: '',
      zip: '',
      state: ''
    }
  }
  empInfo: any
  totalTax: number = 0
  taxableIncome: number = 0

  constructor(private route: ActivatedRoute, private es: EmployeesService) { }

  ngOnInit(): void {
    this.route.params.subscribe(async (val) => {
      const employeeID = val.id
      const data = await this.es.getPaySlipByID(employeeID).toPromise()
      this.empInfo = data.empInfo
      console.log(this.empInfo)
      this.orgInfo = data.orgInfo
      this.calculateTaxableIncome()
      this.calculateTotalTax()
    })
  }

  calculateTaxableIncome() {
    this.taxableIncome = this.empInfo.salary
    this.empInfo.exemptions.map((exemption) => {
      this.taxableIncome -= exemption.deductible
    })
    this.taxableIncome = this.taxableIncome > 0 ? this.taxableIncome : 0
  }

  calculateTotalTax() {
    this.totalTax = 0
    this.empInfo.deductions.map((deduction) => {
      this.totalTax += this.calculateTax(deduction['value'], deduction['type'], this.taxableIncome)
    })
  }

  calculateTax(value: number, type: string, salary: number) {
    if (type === 'percent') {
      return (salary * value / 100)
    } else {
      return value
    }
  }

}
