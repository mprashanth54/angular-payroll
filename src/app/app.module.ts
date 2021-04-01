import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { OrganizationComponent } from './organization/organization.component';
import { DeductionsComponent } from './deductions/deductions.component';
import { EmployeesNewComponent } from './employees/employees-new/employees-new.component';
import { HeaderComponent } from './shared/header/header.component';
import { DeductionsNewComponent } from './deductions/deductions-new/deductions-new.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { environment } from '../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/http.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { EmployeesDeductionsComponent } from './employees/employees-deductions/employees-deductions.component';



@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    OrganizationComponent,
    DeductionsComponent,
    EmployeesNewComponent,
    HeaderComponent,
    DeductionsNewComponent,
    HomeComponent,
    EmployeesDeductionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '975974973026-kguicfmdmiktrnm3v5hpq3e8639hb8pc.apps.googleusercontent.com'
          )
        }
      ]
    } as SocialAuthServiceConfig,
  },
  { provide: "BASE_API_URL", useValue: environment.apiUrl },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
