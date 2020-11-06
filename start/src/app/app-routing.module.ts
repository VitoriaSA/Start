import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDepartmentComponent } from './components/list-department/list-department.component';
import { ListEmployeeComponent } from './components/list-employee/list-employee.component';

const routes: Routes = [
  { path: 'listdepartment', component: ListDepartmentComponent },
  { path: 'listemployee', component: ListEmployeeComponent },
  { path: '', redirectTo: '/listdepartment', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
