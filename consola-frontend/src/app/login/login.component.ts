import { Component, OnInit } from "@angular/core";
import { Employee } from "src/app/shared/model/employee";
import { LoginDTO } from "src/app/shared/model/login-dto";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { LoginService } from "../shared/service/login.service";
import { AuthenticationService } from "../shared/service/authentication.service";
import { InvalidLoginComponent } from "../shared/component/project/invalid-login/invalid-login.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public loginForm!: UntypedFormGroup;
  public employeeObj: Employee = new Employee();
  private loginDTO: LoginDTO = new LoginDTO();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    public dialog: MatDialog,
    private authenticationService:AuthenticationService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  login() {
    this.loginDTO.username = this.loginForm.controls.username.value;
    this.loginDTO.password = this.loginForm.controls.password.value;
    this.loginService.login(this.loginDTO).subscribe((data: Employee) => {
      this.employeeObj = new Employee();
      this.employeeObj = data;
      if (this.employeeObj) {
        this.authenticationService.isAuthenticated = true;
        sessionStorage.setItem("isAuthenticated", "true");
        sessionStorage.setItem("loggedUsername", this.employeeObj.username);
        sessionStorage.setItem("loggedFullName", this.employeeObj.fullName);
        sessionStorage.setItem("loggedRole", this.employeeObj.role.name);
        this.router.navigate(["../layout/landing-page"], {
          relativeTo: this.activatedRoute,
        });
       const header = new HeaderComponent(this.router);
       header.checkAuth();
      } else {
        this.dialog.open(InvalidLoginComponent, {
          disableClose: true,
          width: "500px",
        });
      }
    });
  }
}
