import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { EditDepartmentComponent } from './components/edit-department/edit-department.component';
import { CreateDepartmentComponent } from './components/create-department/create-department.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDepartmentComponent } from './components/list-department/list-department.component';
import { ListEmployeeComponent } from './components/list-employee/list-employee.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';

const routes: Routes = [
  { path: 'listdepartment', component: ListDepartmentComponent },
  { path: 'newdepartment', component: CreateDepartmentComponent },
  { path: 'editdepartment', component: EditDepartmentComponent },
  { path: 'listemployee', component: ListEmployeeComponent },
  { path: 'newemployee', component: CreateEmployeeComponent },
  { path: 'editemployee', component: EditEmployeeComponent },
  { path: '', redirectTo: '/listdepartment', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
