import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css'],
  providers: [DatePipe]
})
export class CreateDepartmentComponent implements OnInit {

  created: any;
  department: any;
  departmentForm = new FormGroup({
    name: new FormControl(''),
    initials: new FormControl('')
  });
  erro: any;

  constructor(private crudService: CrudService, private datePipe: DatePipe, private router: Router) {
  }

  ngOnInit(): void {
  }

  create(){

    if (this.departmentForm.value.name && this.departmentForm.value.initials){
      this.department = this.departmentForm.value;
      this.department.active = true;

      this.created = Date.now();
      this.created = this.datePipe.transform(this.created, 'yyyy-MM-ddThh:mm:ss');

      this.department.created = this.created;
      this.department.lastUpdated = this.created;


      this.crudService.postDepartment(this.department).toPromise()
      .then(data => {
        if(data.id){
          alert('Departamento criado.');
          this.router.navigate(['listdepartment']);
        }
        console.log('O data que recebemos', data);
      }).catch(error => {
        this.erro = error;
        console.log('Error: ', error);
        alert("Erro ao inserir departamento, tente novamente mais tarde.");
      });
    }else{
      alert("Preencha todos os campos corretamente!");
    }
  }

}
