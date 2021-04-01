import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";

const jwt = new JwtHelperService();


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private orgValid: BehaviorSubject<Boolean>
  private token: string

  constructor(@Inject('BASE_API_URL') private baseUrl: string, private http: HttpClient) {
    this.orgValid = new BehaviorSubject<Boolean>(false)
    let token = localStorage.getItem('token')
    if (token) {
      this.setToken(token)
    }
  }

  public login(idToken): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, { idToken })
  }

  public getOrgValid(): Observable<Boolean> {
    return this.orgValid.asObservable()
  }

  public getToken(): string {
    return this.token
  }

  public setToken(token: string): void {
    const { data } = jwt.decodeToken(token)
    console.log(data)
    this.orgValid.next(data.orgID ? true : false)
    this.token = token
    localStorage.setItem('token', token)
  }

  public async refreshToken(): Promise<any> {
    const data = await this.http.get(`${this.baseUrl}/auth/token-refresh`).toPromise()
    this.setToken(data['token'])
  }

  public logOut() {
    localStorage.clear()
    this.token = null
    this.orgValid.next(false)
  }
}


