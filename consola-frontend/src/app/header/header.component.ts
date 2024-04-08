import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuItem } from "src/app/shared/interface/menu-item";
import { NotificationService } from "src/app/shared/service/notification.service";
import { LoginService } from "src/app/shared/service/login.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  public loggedFullName = this.loginService?.getLoggedFullName();
  public menuItems: MenuItem[] = [];
  public isAuthenticated: string = "";
  public notficationsCount: string = "";
  count: number = -1;

  constructor(
    private router: Router,
    private notificationService?: NotificationService,
    private loginService?: LoginService
  ) {}

  ngOnInit(): void {
    this.checkAuth();
    let role = sessionStorage.getItem("loggedRole");
    this.notificationService
      ?.getNotificationsCountforLoggedUser()
      .subscribe((data: any) => {
        this.count = data;
        menuItems1.forEach((element) => {
          if (element.label == "Notifications") {
            element.label = "Notifications(" + this.count + ")";
          }
        });
        menuItems2.forEach((element) => {
          if (element.label == "Notifications") {
            element.label = "Notifications(" + this.count + ")";
          }
        });
      });

    let menuItems1: MenuItem[] = [
      {
        label: "Projects",
        icon: "work",
        routerLink: "/layout/project",
      },
      {
        label: "Projects Overview",
        icon: "pageview",
        routerLink: "/layout/projects-overview",
      },
      {
        label: "Employees",
        icon: "people",
        routerLink: "/layout/employee",
      },
      {
        label: "Roles",
        icon: "control_camera",
        routerLink: "/layout/role",
      },
      {
        label: "Status",
        icon: "view_list",
        routerLink: "/layout/status",
      },
      {
        label: "Vacation",
        icon: "calendar_today",
        routerLink: "/layout/vacation",
      },
      {
        label: "Vacation Status",
        icon: "calendar_view_day",
        routerLink: "/layout/vacation-status",
      },
      {
        label: "Notifications",
        icon: "notifications",
        routerLink: "/layout/notification",
      },
      {
        label: "Supervisor Account",
        icon: "supervisor_account",
        routerLink: "/layout/supervisor",
      },
    ];

    let menuItems2: MenuItem[] = [
      {
        label: "Vacation",
        icon: "people",
        routerLink: "/layout/vacation",
      },
      {
        label: "Notifications",
        icon: "notifications",
        routerLink: "/layout/notification",
      },
    ];

    if (role == "Developer") {
      this.menuItems = menuItems2;
    } else {
      this.menuItems = menuItems1;
    }
  }

  redirctToRouterLink(value: any) {
    this.router.navigateByUrl(value.routerLink);
  }

  checkAuth() {
    let temp = sessionStorage.getItem("isAuthenticated");
    if (temp) {
      this.isAuthenticated = temp.toString();
    }
  }

  signOut() {
    window.sessionStorage.clear();
    this.router.navigateByUrl("/login");
  }

  redirectToHomePage() {
    this.router.navigateByUrl("/layout/landing-page");
  }
  redirectToNotifications() {
    this.router.navigateByUrl("/layout/notification");
  }
}
