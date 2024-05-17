import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../model/role';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private url: string = environment.apiUrl;

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
