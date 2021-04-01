import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Array<any> = []
  constructor(private es: EmployeesService, private router: Router) { }

  async ngOnInit(): Promise<any> {
    this.employees = await this.es.getEmployees().toPromise()
  }

  goToEmpProfile(id: string): void {
    this.router.navigate([`/employees/${id}/update`])
  }

  calculate(id: string): void {
    this.router.navigate([`/employees/${id}/deductions`])
  }

}
