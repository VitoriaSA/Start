import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Departments } from 'src/app/models/depatments.model';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.css']
})
export class ListDepartmentComponent implements OnInit {

  departments: Departments;
  erro: any;

  constructor(private crudService: CrudService) {
    this.getter();
  }

  ngOnInit(): void {
  }

  getter(){
    this.crudService.getDepartments().subscribe((data: Departments) => {
      this.departments = data;
      console.log('O data que recebemos', data);
      console.log('A variável que recebemos', this.departments);
    }, (error: any) => {
      this.erro = error;
      console.log('Error: ', error);
    });
  }

  /*getDepartmentid(id: number){
    this.idDepartment = id + 20;
  }*/

}
