import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(@Inject('BASE_API_URL') private baseUrl: string, private http: HttpClient) { }

  getEmployees(): Observable<any> {
    return this.http.get(`${this.baseUrl}/employees`)
  }

  create(employee): Observable<any> {
    return this.http.post(`${this.baseUrl}/employees`, employee)
  }

  getEmployeeById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/employees/${id}`)
  }

  update(id, employee): Observable<any> {
    return this.http.put(`${this.baseUrl}/employees/${id}`, employee)
  }

  getPaySlipByID(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/employees/${id}/payslip`)
  }

}
