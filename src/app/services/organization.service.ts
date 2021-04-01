import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(@Inject('BASE_API_URL') private baseUrl: string, private http: HttpClient) { }

  setOrgData(orgData): Observable<any> {
    return this.http.post(`${this.baseUrl}/organization`, orgData)
  }

  getOrgData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/organization`)
  }
}
