import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DeductionsService {

  constructor(@Inject('BASE_API_URL') private baseUrl: string, private http: HttpClient) { }

  getDeductions(): Observable<any> {
    return this.http.get(`${this.baseUrl}/deductions`)
  }

  create(deduction): Observable<any> {
    return this.http.post(`${this.baseUrl}/deductions`, deduction)
  }

  getDeductionById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/deductions/${id}`)
  }

  update(id, deduction): Observable<any> {
    return this.http.put(`${this.baseUrl}/deductions/${id}`, deduction)
  }
}
