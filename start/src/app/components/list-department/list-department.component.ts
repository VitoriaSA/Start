import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Departments } from 'src/app/models/depatments.model';
import { CrudService } from 'src/app/services/crud.service';
import { DeleteDepartmentComponent } from '../delete-department/delete-department.component';

@Component({
  selector: 'app-list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.css']
})
export class ListDepartmentComponent implements OnInit {

  departments: Departments;
  erro: any;

  constructor(private crudService: CrudService, private modalService: NgbModal) {
    this.getter();
  }

  ngOnInit(): void {
  }

  getter(){
    this.crudService.getDepartments().subscribe((data: Departments) => {
      this.departments = data;
    }, (error: any) => {
      this.erro = error;
      console.log('Error: ', error);
    });
  }

  openDeleteModal($event: MouseEvent, id: number){
    $event.stopPropagation();
    const activeModal = this.modalService.open(DeleteDepartmentComponent);
    activeModal.componentInstance.id = id;
  }

}
