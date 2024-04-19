import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectService } from 'src/app/shared/service/project.service';
import { Project } from 'src/app/shared/model/project';
import { ProjectEmployee } from 'src/app/shared/model/project-employee';
import { EmployeeService } from 'src/app/shared/service/employee.service';
import { Employee } from 'src/app/shared/model/employee';
@Component({
  selector: 'app-project-employee',
  templateUrl: './project-employee.component.html',
  styleUrls: ['./project-employee.component.css']
})
export class ProjectEmployeeComponent implements OnInit {
 // declartion
 public projectEmployeeForm!: UntypedFormGroup;
 public employeeList: Employee[] = [];
 public projectObj: Project = new Project();
 public projectEmployee: ProjectEmployee = new ProjectEmployee();

 constructor(
   private formBuilder: UntypedFormBuilder,
   private employeeService: EmployeeService,
   private projectService: ProjectService,
   public dialogRef: MatDialogRef<ProjectEmployeeComponent>,
   private snackBar: MatSnackBar,
   @Inject(MAT_DIALOG_DATA) public data: any
 ) {}

 ngOnInit(): void {
   this.createForm();
   this.loadEmployees();
   if(this.data.id){
     this.loadProjectById(this.data.id);
   }
 }

 createForm() {
   this.projectEmployeeForm = this.formBuilder.group({
    employeeId: [null, [Validators.required]],
    project: [null],
   });
 }

 // load methods
 loadEmployees() {
   this.employeeService.getAllEmployees().subscribe((data: any) => {
     this.employeeList = data.content;
   });
 }

 loadProjectById(id: number) {
   this.projectService.getProjectByid(id).subscribe((data: Project) => {
     this.projectObj = new Project();
     this.projectObj = data;
     let pjtxt = this.projectObj.shortName +" - "+ this.projectObj.name;
     this.projectEmployeeForm.controls.project.setValue(pjtxt);
   });
 }

 // actions methods
 saveProjectEmployee() {
   this.projectEmployee.projectId =  this.projectObj.id;
   this.projectEmployee.employeeId = this.projectEmployeeForm.controls.employeeId.value;
   this.projectService.saveProjectEmployee(this.projectEmployee).subscribe((data: any) => {
     this.dialogRef.close();
     this.snackBar.open(this.data.snackMessage, '', {
       duration: 3000,
     });
   });
 }

}
