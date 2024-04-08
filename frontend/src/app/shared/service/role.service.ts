import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../model/role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private url: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  getAllRolesPg(pageIndex: number, pageSize: number): any {
    return this.http.get(
      this.url + 'api/roles?pageIndex=' + pageIndex + '&pageSize=' + pageSize
    );
  }

  getAllRoles(): any {
    return this.http.get(this.url + 'api/roles');
  }

  getRoleByid(id: number): any {
    return this.http.get(this.url + 'api/roles/' + id);
  }

  saveRole(role: Role): Observable<any> {
    return this.http.post(this.url + 'api/roles/save', role);
  }

  deleteRoleByid(id: number): any {
    return this.http.delete(this.url + 'api/roles/' + id);
  }
}
