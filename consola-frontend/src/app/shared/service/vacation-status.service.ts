import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from '../model/status';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VacationStatusService {
  private url: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllStatusPg(pageIndex: number, pageSize: number): any {
    return this.http.get(
      this.url + 'api/vacation-status?pageIndex=' + pageIndex + '&pageSize=' + pageSize
    );
  }

  getAllStatus(): any {
    return this.http.get(this.url + 'api/vacation-status');
  }

  getStatusByid(id: number): any {
    return this.http.get(this.url + 'api/vacation-status/' + id);
  }

  saveStatus(status: Status): Observable<any> {
    return this.http.post(this.url + 'api/vacation-status/save', status);
  }

  deleteStatusByid(id: number): any {
    return this.http.delete(this.url + 'api/vacation-status/' + id);
  }
}
