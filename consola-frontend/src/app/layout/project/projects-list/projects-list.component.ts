import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteDialogComponent } from 'src/app/shared/component/project/delete-dialog/delete-dialog.component';
import { Project } from 'src/app/shared/model/project';
import { ProjectService } from 'src/app/shared/service/project.service';
import { ProjectComponent } from '../project/project.component';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css'],
})
export class ProjectsListComponent implements OnInit {
  // declartion
  dataSource = new MatTableDataSource<Project>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns = [
    'status',
    'name',
    'shortName',
    'startDate',
    'endDate',
    'action',
  ];

  //paginator parameters
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 50, 100];
  pageIndex = 0;

  constructor(
    private projectService: ProjectService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event) =>
      this.projectService
        .getAllProjects(event.pageIndex, event.pageSize)
        .subscribe((data: any) => {
          this.dataSource.data = data.content;
          this.pageIndex = data.number;
          this.pageSize = data.size;
          this.length = data.totalElements;
        })
    );
  }

  // load methods
  loadProjects() {
    this.projectService
      .getAllProjects(this.pageIndex, this.pageSize)
      .subscribe((data: any) => {
        this.dataSource.data = data.content;
        this.pageIndex = data.number;
        this.pageSize = data.size;
        this.length = data.totalElements;
      });
  }

  // change methods
  sortProjects(sort: Sort) {
    this.dataSource.sort = this.sort;
  }

  filterProjects(event: any) {
    this.dataSource.filter = event.target.value.trim().toLocaleLowerCase();
  }

  // actions methods
  addProject(): void {
    let dialogRef = this.dialog.open(ProjectComponent, {
      data: {
        action: 'Add',
        snackMessage: 'Project added successfully',
      },
      width: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadProjects();
    });
  }

  editProject(id: number) {
    let dialogRef = this.dialog.open(ProjectComponent, {
      data: {
        id,
        action: 'Edit',
        snackMessage: 'Project updated successfully',
      },
      disableClose: true,
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadProjects();
    });
  }

  deleteProject(id: number) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        id,
        entity:'project',
        snackMessage: 'Project deleted successfully',
      },
      disableClose: true,
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadProjects();
    });
  }
}
