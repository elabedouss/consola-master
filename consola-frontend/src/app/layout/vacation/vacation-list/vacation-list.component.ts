import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteDialogComponent } from 'src/app/shared/component/project/delete-dialog/delete-dialog.component';
import { Vacation } from 'src/app/shared/model/vacation';
import { VacationService } from 'src/app/shared/service/vacation.service';
import { VacationComponent } from '../vacation/vacation.component';

@Component({
  selector: 'app-vacation-list',
  templateUrl: './vacation-list.component.html',
  styleUrls: ['./vacation-list.component.css']
})
export class VacationListComponent implements OnInit {
// declartion
dataSource = new MatTableDataSource<Vacation>();

@ViewChild(MatPaginator)
paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

displayedColumns = [
  'id',
  'requestDate',
  'startDate',
  'endDate',
  'duration',
  'status',
  'action',
];

//paginator parameters
length = 0;
pageSize = 10;
pageSizeOptions: number[] = [10, 25, 50, 100];
pageIndex = 0;

constructor(
  private vacationService: VacationService,
  public dialog: MatDialog
) {}

ngOnInit(): void {
  this.loadVacations();
}

ngAfterViewInit() {
  this.paginator.page.subscribe((event) =>
    this.vacationService
      .getAllVacations(event.pageIndex, event.pageSize)
      .subscribe((data: any) => {
        this.dataSource.data = data.content;
        this.pageIndex = data.number;
        this.pageSize = data.size;
        this.length = data.totalElements;
      })
  );
}

// load methods
loadVacations() {
  this.vacationService
    .getAllVacations(this.pageIndex, this.pageSize)
    .subscribe((data: any) => {
      this.dataSource.data = data.content;
      this.pageIndex = data.number;
      this.pageSize = data.size;
      this.length = data.totalElements;
    });
}

// change methods
sortVacations(sort: Sort) {
  this.dataSource.sort = this.sort;
}

filterVacations(event: any) {
  this.dataSource.filter = event.target.value.trim().toLocaleLowerCase();
}

// actions methods
addVacation(): void {
  let dialogRef = this.dialog.open(VacationComponent, {
    data: {
      action: 'Add',
      snackMessage: 'Vacation added successfully',
    },
    width: '600px',
    disableClose: true,
  });

  dialogRef.afterClosed().subscribe(() => {
    this.loadVacations();
  });
}

editVacation(id: number) {
  let dialogRef = this.dialog.open(VacationComponent, {
    data: {
      id,
      action: 'Edit',
      snackMessage: 'Vacation updated successfully',
    },
    disableClose: true,
    width: '600px',
  });
  dialogRef.afterClosed().subscribe(() => {
    this.loadVacations();
  });
}

deleteVacation(id: number) {
  let dialogRef = this.dialog.open(DeleteDialogComponent, {
    data: {
      id,
      entity:'vacation',
      snackMessage: 'Vacation deleted successfully',
    },
    disableClose: true,
    width: '400px',
  });

  dialogRef.afterClosed().subscribe(() => {
    this.loadVacations();
  });
}
}