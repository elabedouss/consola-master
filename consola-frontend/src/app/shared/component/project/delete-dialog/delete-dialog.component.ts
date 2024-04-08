import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ProjectService } from "../../../service/project.service";
import { StatusService } from "../../../service/status.service";
import { VacationStatusService } from "src/app/shared/service/vacation-status.service";
import { RoleService } from "src/app/shared/service/role.service";
import { EmployeeService } from "src/app/shared/service/employee.service";
import { VacationService } from "src/app/shared/service/vacation.service";

@Component({
  selector: "app-delete-dialog",
  templateUrl: "./delete-dialog.component.html",
  styleUrls: ["./delete-dialog.component.css"],
})
export class DeleteDialogComponent implements OnInit {
  constructor(
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private vacationService: VacationService,
    private statusService: StatusService,
    private vacationStatusService: VacationStatusService,
    private roleService: RoleService,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  cancel(): void {
    this.dialogRef.close();
  }

  deleteProject() {
    this.projectService
      .deleteProjectByid(this.data.id)
      .subscribe((data: any) => {
        this.snackBar.open(this.data.snackMessage, "", {
          duration: 3000,
        });
        this.dialogRef.close();
      });
  }

  deleteStatus() {
    this.statusService.deleteStatusByid(this.data.id).subscribe((data: any) => {
      this.snackBar.open(this.data.snackMessage, "", {
        duration: 3000,
      });
      this.dialogRef.close();
    });
  }

  deleteVacationStatus() {
    this.vacationStatusService
      .deleteStatusByid(this.data.id)
      .subscribe((data: any) => {
        this.snackBar.open(this.data.snackMessage, "", {
          duration: 3000,
        });
        this.dialogRef.close();
      });
  }

  deleteEmployee() {
    this.employeeService
      .deleteEmployeeByid(this.data.id)
      .subscribe((data: any) => {
        this.snackBar.open(this.data.snackMessage, "", {
          duration: 3000,
        });
        this.dialogRef.close();
      });
  }

  deleteVacation() {
    this.vacationService
      .deleteVacationByid(this.data.id)
      .subscribe((data: any) => {
        this.snackBar.open(this.data.snackMessage, "", {
          duration: 3000,
        });
        this.dialogRef.close();
      });
  }

  deleteRole() {
    this.roleService.deleteRoleByid(this.data.id).subscribe((data: any) => {
      this.snackBar.open(this.data.snackMessage, "", {
        duration: 3000,
      });
      this.dialogRef.close();
    });
  }
}
