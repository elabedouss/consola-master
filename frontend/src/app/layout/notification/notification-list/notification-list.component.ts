import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteDialogComponent } from 'src/app/shared/component/project/delete-dialog/delete-dialog.component';
import { Notification } from 'src/app/shared/model/notification';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

  // declartion
  dataSource = new MatTableDataSource<Notification>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns = [
    'id',
    'vacation',
    'date',
    'seen',
    'action'
  ];

  //paginator parameters
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 50, 100];
  pageIndex = 0;

  constructor(
    private notificationService: NotificationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event) =>
      this.notificationService
        .getAllNotifications(event.pageIndex, event.pageSize)
        .subscribe((data: any) => {
          this.dataSource.data = data.content;
          this.pageIndex = data.number;
          this.pageSize = data.size;
          this.length = data.totalElements;
        })
    );
  }

  // load methods
  loadNotifications() {
    this.notificationService.getAllNotifications(this.pageIndex, this.pageSize)
      .subscribe((data: any) => {
        this.dataSource.data = data.content;
        this.pageIndex = data.number;
        this.pageSize = data.size;
        this.length = data.totalElements;
      });
  }

  // change methods
  sortNotifications(sort: Sort) {
    this.dataSource.sort = this.sort;
  }

  filterNotifications(event: any) {
    this.dataSource.filter = event.target.value.trim().toLocaleLowerCase();
  }

  // actions methods

  openNotification(id: number) {
    let dialogRef = this.dialog.open(NotificationComponent, {
      data: {
        id,
        action: 'Edit',
        snackMessage: '',
      },
      disableClose: true,
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadNotifications();
    });
  }

}
