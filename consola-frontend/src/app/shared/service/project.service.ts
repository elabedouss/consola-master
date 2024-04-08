import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../model/project';
import { ProjectEmployee } from '../model/project-employee';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private url: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  getAllProjects(pageIndex: number, pageSize: number): any {
    return this.http.get(
      this.url + 'api/projects?pageIndex=' + pageIndex + '&pageSize=' + pageSize
    );
  }

  getAllProjects2(): any {
    return this.http.get(this.url + 'api/projects/all');
  }

  getProjectByid(id: number): any {
    return this.http.get(this.url + 'api/projects/' + id);
  }

  saveProject(project: Project): Observable<any> {
    return this.http.post(this.url + 'api/projects/save', project);
  }

  saveProjectEmployee(projectEmployee: ProjectEmployee): Observable<any> {
    return this.http.post(this.url + 'api/projects/project-employee',projectEmployee);
  }

  deleteProjectByid(id: number): any {
    return this.http.delete(this.url + 'api/projects/' + id);
  }
}
