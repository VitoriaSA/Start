import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ListEmployeeComponent } from './components/list-employee/list-employee.component';
import { ListDepartmentComponent } from './components/list-department/list-department.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { CreateDepartmentComponent } from './components/create-department/create-department.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditDepartmentComponent } from './components/edit-department/edit-department.component';
import { DeleteDepartmentComponent } from './components/delete-department/delete-department.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { DeleteEmployeeComponent } from './components/delete-employee/delete-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeeComponent,
    ListDepartmentComponent,
    HeaderComponent,
    FooterComponent,
    CreateDepartmentComponent,
    EditDepartmentComponent,
    DeleteDepartmentComponent,
    CreateEmployeeComponent,
    EditEmployeeComponent,
    DeleteEmployeeComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
