import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../model/notification';
import { LoginService } from "src/app/shared/service/login.service";

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private url: string = 'http://localhost:8080/';

  constructor(private http: HttpClient, private loginService: LoginService,) {

  }

  getAllNotifications(pageIndex: number, pageSize: number): any {
    return this.http.get(
      this.url + 'api/notifications/user/'+this.loginService.getLoggedUsername()+'?pageIndex=' + pageIndex + '&pageSize=' + pageSize
    );
  }

  getNotificationByid(id: number): any {
    return this.http.get(this.url + 'api/notifications/' + id);
  }

  getNotificationsCountforLoggedUser(): any {
    return this.http.get<number>(this.url + 'api/notifications/count/' + this.loginService.getLoggedUsername());
  }
}
