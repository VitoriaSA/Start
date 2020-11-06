import { Employees } from 'src/app/models/employees.model';
import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Departments } from 'src/app/models/depatments.model';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css'],
  providers: [DatePipe]
})
export class DeleteEmployeeComponent implements OnInit {

  @Input() id;
  @Input() departmentId;
  employee: Employees;
  departments: Departments;
  created: any;
  department: any;
  erro: any;

  constructor(private crudService: CrudService, private datePipe: DatePipe, public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.getter();
  }

  getter(){
    this.crudService.getDepartmentById(this.departmentId).subscribe((data: Departments) => {
      this.departments = data;

      for (let key in this.departments.employees){
        if (this.departments.employees[key].id == this.id){
          this.employee = this.departments.employees[key];
        }
      }

    }, (error: any) => {
      this.erro = error;
      console.log('Error: ', error);
    });
  }

  del(){
      this.department = this.departments;

      this.employee.active = false;

      this.created = Date.now();
      this.created = this.datePipe.transform(this.created, 'yyyy-MM-ddThh:mm:ss');
      this.employee.lastUpdated = this.created;

      for (let key in this.department.employees){
        if (this.department.employees[key].id == this.id){
          this.department.employees[key] = this.employee;
        }
      }

      this.crudService.putDepartment(this.department.id, this.department).toPromise()
      .then(data => {
        if (data.id){
          console.log('Funcionário deletado.');
          this.activeModal.close();
        }
      }).catch(error => {
        this.erro = error;
        console.log('Error: ', error);
        alert("Erro ao deletar Funcionario, tente novamente mais tarde.");
      });

  }
}
