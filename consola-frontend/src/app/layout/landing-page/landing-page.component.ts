import { Component, OnInit } from "@angular/core";
import {
  CalendarEvent,
  CalendarMonthViewBeforeRenderEvent,
  CalendarView,
} from "angular-calendar";
import { VacationService } from "src/app/shared/service/vacation.service";

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.css"],
})
export class LandingPageComponent implements OnInit {
  constructor(private vacationService: VacationService) {}
  vacations: any;
  viewDate = new Date();
  view: CalendarView = CalendarView.Month;
  events: CalendarEvent[] = [];
  ngOnInit(): void {}

  beforeMonthViewRender(renderEvent: CalendarMonthViewBeforeRenderEvent): void {
    const loggedUsername = sessionStorage.getItem("loggedUsername")?.toString();

    this.vacationService
      .getVacationsByUsername(loggedUsername)
      .subscribe((data: any) => {
        this.vacations = data;
        this.vacations.forEach((vacation: any) => {
          renderEvent.body.forEach((day) => {
            const dayOfMonth = day.date.getDate();
            if (
              dayOfMonth > new Date(vacation.startDate).getDate() &&
              dayOfMonth < new Date(vacation.endDate).getDate() &&
              day.date.getMonth() + 1 ==
                new Date(vacation.startDate).getMonth() + 1
            ) {
              switch (vacation.vacationStatus.name) {
                case "Pending":
                  day.cssClass = "bg-pending";
                  break;
                case "Approved":
                  day.cssClass = "bg-approved";
                  break;
                case "Rejected":
                  day.cssClass = "bg-rejected";
                  break;
              }
            }
          });
        });
      });
  }
}
