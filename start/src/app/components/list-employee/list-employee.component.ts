import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Departments } from 'src/app/models/depatments.model';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  departments: Departments;
  departmentId: string;
  departmentIdLocal: string;
  erro: any;

  constructor(private crudService: CrudService) {
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
    console.log(this.departmentIdLocal);
    this.crudService.getDepartmentById(this.departmentIdLocal).subscribe((data: Departments) => {
      this.departments = data;
      console.log('Employee', this.departments.employees);
    }, (error: any) => {
      this.erro = error;
      console.log('Error: ', error);
    });
  }

}
