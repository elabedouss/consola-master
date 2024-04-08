import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/shared/model/employee';
import { Role } from 'src/app/shared/model/role';
import { EmployeeService } from 'src/app/shared/service/employee.service';
import { RoleService } from 'src/app/shared/service/role.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  // declartion
  public employeeForm!: FormGroup;
  public roleList: Role[] = [];
  public responsiblesList: Employee[] = [];
  public employeeObj: Employee = new Employee();

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<EmployeeComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadRoles();
    this.loadResponsibles();
    if(this.data.id){
      this.loadEmployeeById(this.data.id);
    }
  }

  createForm() {
    this.employeeForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      fullName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      role: [null, [Validators.required]],
      responsible: [null, []],
      joinDate: [null, [Validators.required]],
      leaveDate: [null, []],
      initialBalance: [null, [Validators.required]],
      currentBalance: [null, [Validators.required]],
    });
  }

  // load methods
  loadRoles() {
    this.roleService.getAllRoles().subscribe((data: any) => {
      this.roleList = data.content;
    });
  }

  loadResponsibles() {
    this.employeeService.getAllEmployees().subscribe((data: any) => {
      this.responsiblesList = data.content;
    });
  }

  loadEmployeeById(id: string) {
    this.employeeService.getEmployeeByid(id).subscribe((data: Employee) => {
      this.employeeObj = new Employee();
      this.employeeObj = data;
      this.employeeForm.controls.username.setValue(this.employeeObj.username);
      this.employeeForm.controls.fullName.setValue(this.employeeObj.fullName);
      this.employeeForm.controls.email.setValue(this.employeeObj.email);
      this.employeeForm.controls.role.setValue(this.employeeObj.role.id);
      if(this.employeeObj.responsible){
        this.employeeForm.controls.responsible.setValue(this.employeeObj.responsible.username);
      }
      this.employeeForm.controls.joinDate.setValue(this.employeeObj.joinDate);
      this.employeeForm.controls.leaveDate.setValue(this.employeeObj.leaveDate);
      this.employeeForm.controls.initialBalance.setValue(this.employeeObj.initialBalance);
      this.employeeForm.controls.currentBalance.setValue(this.employeeObj.currentBalance);
    });
  }

  // actions methods
  saveEmployee() {
    this.employeeObj.username = this.employeeForm.controls.username.value;
    this.employeeObj.fullName = this.employeeForm.controls.fullName.value;
    this.employeeObj.email = this.employeeForm.controls.email.value;
    this.employeeObj.role = new Role(this.employeeForm.controls.role.value);
    if(this.employeeForm.controls.responsible.value){
      this.employeeObj.responsible = new Employee(this.employeeForm.controls.responsible.value);
    }
    this.employeeObj.joinDate = this.employeeForm.controls.joinDate.value;
    this.employeeObj.leaveDate = this.employeeForm.controls.leaveDate.value;
    this.employeeObj.initialBalance = this.employeeForm.controls.initialBalance.value;
    this.employeeObj.currentBalance = this.employeeForm.controls.currentBalance.value;

    this.employeeService.saveEmployee(this.employeeObj).subscribe((data: any) => {
      this.dialogRef.close();
      this.snackBar.open(this.data.snackMessage, '', {
        duration: 3000,
      });
    });
  }
}