import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Vacation } from "../model/vacation";

@Injectable({
  providedIn: "root",
})
export class VacationService {
  private url: string = "http://localhost:8080/";

  constructor(private http: HttpClient) {}

  getAllVacations(pageIndex: number, pageSize: number): any {
    return this.http.get(
      this.url +
        "api/vacations?pageIndex=" +
        pageIndex +
        "&pageSize=" +
        pageSize
    );
  }

  getVacationByid(id: number): any {
    return this.http.get(this.url + "api/vacations/" + id);
  }

  approveVacation(id: number): any {
    return this.http.get(this.url + "api/vacations/approve/" + id);
  }

  rejectVacation(id: number): any {
    return this.http.get(this.url + "api/vacations/reject/" + id);
  }

  saveVacation(vacation: Vacation): Observable<any> {
    return this.http.post(this.url + "api/vacations/save", vacation);
  }

  deleteVacationByid(id: number): any {
    return this.http.delete(this.url + "api/vacations/" + id);
  }
  
  getVacationsByUsername(username: any): Observable<any> {
    return this.http.get(this.url + "api/vacations/username/" + username);
  }
}
