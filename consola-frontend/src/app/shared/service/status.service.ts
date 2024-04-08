import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from '../model/status';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private url: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  getAllStatusPg(pageIndex: number, pageSize: number): any {
    return this.http.get(
      this.url + 'api/status?pageIndex=' + pageIndex + '&pageSize=' + pageSize
    );
  }

  getAllStatus(): any {
    return this.http.get(this.url + 'api/status');
  }

  getStatusByid(id: number): any {
    return this.http.get(this.url + 'api/status/' + id);
  }

  saveStatus(status: Status): Observable<any> {
    return this.http.post(this.url + 'api/status/save', status);
  }

  deleteStatusByid(id: number): any {
    return this.http.delete(this.url + 'api/status/' + id);
  }
}
