import { Departments } from './../models/depatments.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient){ }

  public getDepartments(): Observable<any> {
    return this.http.get('http://localhost:49757/api/Departments');
  }

  public getDepartmentById(id: string): Observable<any> {
    return this.http.get('http://localhost:49757/api/Departments/' + id);
  }

}
