import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Departments } from 'src/app/models/depatments.model';
import { Employees } from 'src/app/models/employees.model';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
  providers: [DatePipe]
})
export class EditEmployeeComponent implements OnInit {

  employee: Employees;
  departments: Departments;
  departmentId: string;
  employeeId: string;
  departmentIdLocal: string;
  employeeIdLocal: string;
  created: any;
  department: any;
  employeeForm = new FormGroup({
    picture: new FormControl(''),
    name: new FormControl(''),
    rg: new FormControl('')
  });
  erro: any;

  constructor(private crudService: CrudService, private datePipe: DatePipe, private router: Router) {
    if (history.state.data !== undefined){
      this.departmentId = history.state.data;
      localStorage.setItem('departmentId', this.departmentId);
    }

    if (history.state.employee !== undefined){
      this.employeeId = history.state.employee;
      localStorage.setItem('employeeId', this.employeeId);
    }
    this.getter();
  }

  ngOnInit(): void {
  }

  getter(){
    this.departmentIdLocal = localStorage.getItem('departmentId');
    this.employeeIdLocal = localStorage.getItem('employeeId');
    this.crudService.getDepartmentById(this.departmentIdLocal).subscribe((data: Departments) => {
      this.departments = data;

      for (let key in this.departments.employees){
        if (this.departments.employees[key].id == this.employeeIdLocal){
          this.employee = this.departments.employees[key];
        }
      }

      this.employeeForm.patchValue({
        picture: this.employee.picture,
        name: this.employee.name,
        rg: this.employee.rg
      });

      console.log('Employee', this.departments);
    }, (error: any) => {
      this.erro = error;
      console.log('Error: ', error);
    });
  }

  edit(){

    if (this.employeeForm.value.name && this.employeeForm.value.rg && this.employeeForm.value.picture){
      this.employee.name = this.employeeForm.value.name;
      this.employee.rg = this.employeeForm.value.rg;
      this.employee.picture = this.employeeForm.value.picture;

      this.employee.active = true;

      this.created = Date.now();
      this.created = this.datePipe.transform(this.created, 'yyyy-MM-ddThh:mm:ss');
      this.employee.lastUpdated = this.created;

      this.department = this.departments;

      for (let key in this.department.employees){
        if (this.department.employees[key].id == this.employeeIdLocal){
          this.department.employees[key] = this.employee;
        }
      }

      this.crudService.putDepartment(this.department.id, this.department).toPromise()
      .then(data => {
        if (data.id){
          alert('Funcionário alterado.');
          this.router.navigate(['listemployee']);
        }
      }).catch(error => {
        this.erro = error;
        console.log('Error: ', error);
        alert("Erro ao alterar funcionário, tente novamente mais tarde.");
      });
    }else{
      alert("Preencha todos os campos corretamente!");
    }
  }
}
