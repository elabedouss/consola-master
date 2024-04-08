import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteDialogComponent } from 'src/app/shared/component/project/delete-dialog/delete-dialog.component';
import { Status } from 'src/app/shared/model/status';
import { StatusService } from 'src/app/shared/service/status.service';
import { StatusComponent } from '../status/status.component';

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.css']
})
export class StatusListComponent implements OnInit {

  // declartion
  dataSource = new MatTableDataSource<Status>();

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
    private statusService: StatusService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadStatus();
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event) =>
      this.statusService
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
    this.statusService
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
    let dialogRef = this.dialog.open(StatusComponent, {
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
    let dialogRef = this.dialog.open(StatusComponent, {
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
        entity:'status',
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