import { Employees } from './../../models/employees.model';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Departments } from 'src/app/models/depatments.model';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
  providers: [DatePipe]
})

export class CreateEmployeeComponent implements OnInit {

  employee: Employees;
  departments: Departments;
  departmentId: string;
  departmentIdLocal: string;
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
    this.getter();
  }

  ngOnInit(): void {
  }

  getter(){
    this.departmentIdLocal = localStorage.getItem('departmentId');
    this.crudService.getDepartmentById(this.departmentIdLocal).subscribe((data: Departments) => {
      this.departments = data;
    }, (error: any) => {
      this.erro = error;
      console.log('Error: ', error);
    });
  }

  create(){

    if (this.employeeForm.value.name && this.employeeForm.value.rg && this.employeeForm.value.picture){
      this.employee = this.employeeForm.value;

      this.employee.active = true;

      this.created = Date.now();
      this.created = this.datePipe.transform(this.created, 'yyyy-MM-ddThh:mm:ss');

      this.employee.created = this.created;
      this.employee.lastUpdated = this.created;

      this.department = this.departments;
      this.department.employees.push(this.employee);

      this.crudService.putDepartment(this.department.id, this.department).toPromise()
      .then(data => {
        if (data.id){
          alert('Funcionário criado.');
          this.router.navigate(['listemployee']);
        }
        console.log('O data que recebemos', data);
      }).catch(error => {
        this.erro = error;
        console.log('Error: ', error);
        alert("Erro ao inserir funcionário, tente novamente mais tarde.");
      });
    }else{
      alert("Preencha todos os campos corretamente!");
    }
  }

}
