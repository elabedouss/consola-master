import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteDialogComponent } from 'src/app/shared/component/project/delete-dialog/delete-dialog.component';
import { VacationStatus } from 'src/app/shared/model/vacation-status';
import { VacationStatusService } from 'src/app/shared/service/vacation-status.service';
import { VacationStatusComponent } from '../vacation-status/vacation-status.component';

@Component({
  selector: 'app-vacation-status-list',
  templateUrl: './vacation-status-list.component.html',
  styleUrls: ['./vacation-status-list.component.css']
})
export class VacationStatusListComponent implements OnInit {

  // declartion
  dataSource = new MatTableDataSource<VacationStatus>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns = [
    'id',
    'name',
    'action',
  ];

  //paginator parameters
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 50, 100];
  pageIndex = 0;

  constructor(
    private vacationStatusService: VacationStatusService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadStatus();
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event) =>
      this.vacationStatusService
        .getAllStatusPg(event.pageIndex, event.pageSize)
        .subscribe((data: any) => {
          this.dataSource.data = data.content;
          this.pageIndex = data.number;
          this.pageSize = data.size;
          this.length = data.totalElements;
        })
    );
  }

  // load methods
  loadStatus() {
    this.vacationStatusService
      .getAllStatusPg(this.pageIndex, this.pageSize)
      .subscribe((data: any) => {
        this.dataSource.data = data.content;
        this.pageIndex = data.number;
        this.pageSize = data.size;
        this.length = data.totalElements;
      });
  }

  // change methods
  sortStatus(sort: Sort) {
    this.dataSource.sort = this.sort;
  }

  filterStatus(event: any) {
    this.dataSource.filter = event.target.value.trim().toLocaleLowerCase();
  }

  // actions methods
  addStatus(): void {
    let dialogRef = this.dialog.open(VacationStatusComponent, {
      data: {
        action: 'Add',
        snackMessage: 'Status added successfully',
      },
      width: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadStatus();
    });
  }

  editStatus(id: number) {
    let dialogRef = this.dialog.open(VacationStatusComponent, {
      data: {
        id,
        action: 'Edit',
        snackMessage: 'Status updated successfully',
      },
      disableClose: true,
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadStatus();
    });
  }

  deleteStatus(id: number) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        id,
        entity:'vacation-status',
        snackMessage: 'Status deleted successfully',
      },
      disableClose: true,
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadStatus();
    });
  }

}
