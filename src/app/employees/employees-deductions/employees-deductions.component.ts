import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employees-deductions',
  templateUrl: './employees-deductions.component.html',
  styleUrls: ['./employees-deductions.component.css']
})
export class EmployeesDeductionsComponent implements OnInit {

  orgInfo: any
  empInfo: any
  totalTax: number = 0

  constructor(private route: ActivatedRoute, private es: EmployeesService) { }

  ngOnInit(): void {
    this.route.params.subscribe(async (val) => {
      const employeeID = val.id
      const data = await this.es.getPaySlipByID(employeeID).toPromise()
      this.empInfo = data.empInfo
      this.orgInfo = data.orgInfo
      this.calculateTotalTax()
    })
  }


  calculateTotalTax() {
    this.empInfo.deductions.map((deduction) => {
      this.totalTax += this.calculateTax(deduction['value'], deduction['type'], this.empInfo.salary)
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
