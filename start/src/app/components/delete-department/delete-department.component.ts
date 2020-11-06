import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Departments } from 'src/app/models/depatments.model';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-delete-department',
  templateUrl: './delete-department.component.html',
  styleUrls: ['./delete-department.component.css'],
  providers: [DatePipe]
})
export class DeleteDepartmentComponent implements OnInit {

  @Input() id;
  departments: Departments;
  departmentId: string;
  departmentIdLocal: string;
  created: any;
  department: any;
  erro: any;

  constructor(private crudService: CrudService, private datePipe: DatePipe, public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.getter();
  }

  getter(){
    this.crudService.getDepartmentById(this.id).subscribe((data: Departments) => {
      this.departments = data;
    }, (error: any) => {
      this.erro = error;
      console.log('Error: ', error);
    });
  }

  del(){
      this.department = this.departments;

      this.department.active = false;

      this.created = Date.now();
      this.created = this.datePipe.transform(this.created, 'yyyy-MM-ddThh:mm:ss');
      this.department.lastUpdated = this.created;

      if (this.department.employees){
        this.department.employees.forEach(function (current) {
          current.active = false;
        });
      }

      console.log(this.department);

      this.crudService.putDepartment(this.department.id, this.department).toPromise()
      .then(data => {
        if (data.id){
          console.log('Departamento deletado.');
          this.activeModal.close();
        }
        console.log('O data que recebemos', data);
      }).catch(error => {
        this.erro = error;
        console.log('Error: ', error);
        alert("Erro ao deletar departamento, tente novamente mais tarde.");
      });
  }
}
