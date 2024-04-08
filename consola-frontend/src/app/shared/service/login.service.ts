import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDTO } from '../model/login-dto';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url: string = 'http://localhost:8080/';
  public isAuthenticated=false;
  
  constructor(private http: HttpClient) {}

  login(loginDTO: LoginDTO): any {
    return this.http.post(this.url + 'api/employees/login', loginDTO);
  }

  loggetin(loginDTO: LoginDTO): any {
    return this.http.post(this.url + 'api/employees/login', loginDTO);
  }

  public getLoggedUsername(): string {
    let loggedUsername = '';
    let temp = sessionStorage.getItem("loggedUsername");
    if (temp) {
      loggedUsername = temp.toString();
    }
    return loggedUsername;
   }

   public getLoggedFullName(): string {
    let loggedFullName = '';
    let temp = sessionStorage.getItem("loggedFullName");
    if (temp) {
      loggedFullName = temp.toString();
    }
    return loggedFullName;
   }

}