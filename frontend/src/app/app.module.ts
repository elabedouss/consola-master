import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { HttpClientModule } from "@angular/common/http";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatDividerModule } from "@angular/material/divider";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { LoginComponent } from "./login/login.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatMenuModule } from "@angular/material/menu";
import { RouterModule } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { DeleteDialogComponent } from "./shared/component/project/delete-dialog/delete-dialog.component";
import { InvalidLoginComponent } from "./shared/component/project/invalid-login/invalid-login.component";
import { MatDialogModule } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    DeleteDialogComponent,
    InvalidLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    FlexLayoutModule,
    MatInputModule,
    MatMenuModule,
    RouterModule,
    MatDialogModule,
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
