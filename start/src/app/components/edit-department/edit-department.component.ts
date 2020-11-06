import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Departments } from 'src/app/models/depatments.model';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css'],
  providers: [DatePipe]
})
export class EditDepartmentComponent implements OnInit {

  departments: Departments;
  departmentId: string;
  departmentIdLocal: string;
  created: any;
  department: any;
  departmentForm = new FormGroup({
    name: new FormControl(''),
    initials: new FormControl('')
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

      this.departmentForm.patchValue({
        name: [this.departments.name],
        initials: [this.departments.initials]
      });

      console.log('Employee', this.departments.employees);
    }, (error: any) => {
      this.erro = error;
      console.log('Error: ', error);
    });
  }

  edit(){
    if (this.departmentForm.value.name && this.departmentForm.value.initials){
      this.department = this.departments;
      this.department.name = this.departmentForm.value.name.toString();
      this.department.initials = this.departmentForm.value.initials.toString();

      this.department.active = true;

      this.created = Date.now();
      this.created = this.datePipe.transform(this.created, 'yyyy-MM-ddThh:mm:ss');
      this.department.lastUpdated = this.created;

      this.crudService.putDepartment(this.department.id, this.department).toPromise()
      .then(data => {
        if(data.id){
          alert('Departamento alterado.');
          this.router.navigate(['listdepartment']);
        }
      }).catch(error => {
        this.erro = error;
        console.log('Error: ', error);
        alert("Erro ao editar departamento, tente novamente mais tarde.");
      });
    }else{
      alert("Preencha todos os campos corretamente!");
    }
  }
}


