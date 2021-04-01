import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeductionsNewComponent } from './deductions/deductions-new/deductions-new.component';
import { DeductionsComponent } from './deductions/deductions.component';
import { EmployeesDeductionsComponent } from './employees/employees-deductions/employees-deductions.component';
import { EmployeesNewComponent } from './employees/employees-new/employees-new.component';
import { EmployeesComponent } from './employees/employees.component';
import { HomeComponent } from './home/home.component';
import { OrganizationComponent } from './organization/organization.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuardService] },
  { path: 'organization', component: OrganizationComponent, canActivate: [AuthGuardService] },
  { path: 'deductions', component: DeductionsComponent, canActivate: [AuthGuardService] },
  { path: 'employees/new', component: EmployeesNewComponent, canActivate: [AuthGuardService] },
  { path: 'deductions/new', component: DeductionsNewComponent, canActivate: [AuthGuardService] },
  { path: 'deductions/:id/update', component: DeductionsNewComponent, canActivate: [AuthGuardService] },
  { path: 'employees/:id/update', component: EmployeesNewComponent, canActivate: [AuthGuardService] },
  { path: 'employees/:id/deductions', component: EmployeesDeductionsComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
