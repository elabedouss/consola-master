import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsOverviewComponent } from './project/projects-overview/projects-overview.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LayoutComponent } from './layout.component';
import { NotificationListComponent } from './notification/notification-list/notification-list.component';
import { ProjectsListComponent } from './project/projects-list/projects-list.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { StatusListComponent } from './status/status-list/status-list.component';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { VacationStatusListComponent } from './vacation-status/vacation-status-list/vacation-status-list.component';
import { VacationListComponent } from './vacation/vacation-list/vacation-list.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'landing-page', component: LandingPageComponent },
      { path: 'project', component: ProjectsListComponent },
      { path: 'status', component: StatusListComponent },
      { path: 'role', component: RoleListComponent },
      { path: 'vacation-status', component: VacationStatusListComponent },
      { path: 'vacation', component: VacationListComponent },
      { path: 'employee', component: EmployeeListComponent },
      { path: 'notification', component: NotificationListComponent },
      { path: 'supervisor', component: SupervisorComponent },
      { path: 'projects-overview', component: ProjectsOverviewComponent },
      { path: '**', redirectTo: 'landing-page', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
