import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private url: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllEmployeesPg(pageIndex: number, pageSize: number): any {
    return this.http.get(
      this.url + 'api/employees?pageIndex=' + pageIndex + '&pageSize=' + pageSize
    );
  }

  getAllEmployees(): any {
    return this.http.get(this.url + 'api/employees');
  }

  getEmployeeByid(id: string): any {
    return this.http.get(this.url + 'api/employees/' + id);
  }

  saveEmployee(employee: Employee): Observable<any> {
    return this.http.post(this.url + 'api/employees/save', employee);
  }

  deleteEmployeeByid(id: string): any {
    return this.http.delete(this.url + 'api/employees/' + id);
  }
}
