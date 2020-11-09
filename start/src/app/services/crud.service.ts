import { Departments } from './../models/depatments.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  public postDepartment(department: object): Observable<any> {
    return this.http.post('http://localhost:49757/api/Departments', department);
  }

  public putDepartment(id: string, department: object): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:49757/api/Departments/' + id , department, { headers } );
  }

  public postFile(picture: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'text/plain;charset=utf-8');
    headers.append('Accept', 'application/json, text/html, */*');

    return this.http.post('http://localhost:49757/api/Departments/UploadFile', picture, { headers, responseType: 'text' as 'json' });
  }

}
