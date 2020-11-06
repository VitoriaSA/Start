import { DeleteEmployeeComponent } from './../delete-employee/delete-employee.component';
import { Component, OnInit } from '@angular/core';
import { Departments } from 'src/app/models/depatments.model';
import { CrudService } from 'src/app/services/crud.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private crudService: CrudService, private modalService: NgbModal) {

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

  openDeleteModal($event: MouseEvent, id: number, departmentId: number){
    $event.stopPropagation();
    const activeModal = this.modalService.open(DeleteEmployeeComponent);
    activeModal.componentInstance.id = id;
    activeModal.componentInstance.departmentId = departmentId;
  }

}
