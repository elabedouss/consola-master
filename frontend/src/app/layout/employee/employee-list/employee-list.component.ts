import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteDialogComponent } from 'src/app/shared/component/project/delete-dialog/delete-dialog.component';
import { Employee } from 'src/app/shared/model/employee';
import { EmployeeService } from 'src/app/shared/service/employee.service';
import { EmployeeComponent } from '../employee/employee.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  // declartion
  dataSource = new MatTableDataSource<Employee>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns = [
    'username',
    'fullName',
    'role',
    'responsible',
    'joinDate',
    'leaveDate',
    'initialBalance',
    'currentBalance',
    'action',
  ];

  //paginator parameters
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 50, 100];
  pageIndex = 0;

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event) =>
      this.employeeService
        .getAllEmployeesPg(event.pageIndex, event.pageSize)
        .subscribe((data: any) => {
          this.dataSource.data = data.content;
          this.pageIndex = data.number;
          this.pageSize = data.size;
          this.length = data.totalElements;
        })
    );
  }

  // load methods
  loadEmployees() {
    this.employeeService
      .getAllEmployeesPg(this.pageIndex, this.pageSize)
      .subscribe((data: any) => {
        this.dataSource.data = data.content;
        this.pageIndex = data.number;
        this.pageSize = data.size;
        this.length = data.totalElements;
      });
  }

  // change methods
  sortEmployees(sort: Sort) {
    this.dataSource.sort = this.sort;
  }

  filterEmployees(event: any) {
    this.dataSource.filter = event.target.value.trim().toLocaleLowerCase();
  }

  // actions methods
  addEmployee(): void {
    let dialogRef = this.dialog.open(EmployeeComponent, {
      data: {
        action: 'Add',
        snackMessage: 'Employee added successfully',
      },
      width: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadEmployees();
    });
  }

  editEmployee(id: string) {
    let dialogRef = this.dialog.open(EmployeeComponent, {
      data: {
        id,
        action: 'Edit',
        snackMessage: 'Employee updated successfully',
      },
      disableClose: true,
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadEmployees();
    });
  }

  deleteEmployee(id: string) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        id,
        entity:'employee',
        snackMessage: 'Employee deleted successfully',
      },
      disableClose: true,
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadEmployees();
    });
  }

}
