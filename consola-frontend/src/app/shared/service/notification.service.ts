import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from "src/app/shared/service/login.service";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private url: string = environment.apiUrl;

  constructor(private http: HttpClient, private loginService: LoginService,) {

  }

  getAllNotifications(pageIndex: number, pageSize: number): any {
    return this.http.get(
      this.url + 'api/notifications/user/' + this.loginService.getLoggedUsername() + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize
    );
  }

  getNotificationByid(id: number): any {
    return this.http.get(this.url + 'api/notifications/' + id);
  }

  getNotificationsCountforLoggedUser(): any {
    return this.http.get<number>(this.url + 'api/notifications/count/' + this.loginService.getLoggedUsername());
  }
}
