import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteDialogComponent } from 'src/app/shared/component/project/delete-dialog/delete-dialog.component';
import { Role } from 'src/app/shared/model/role';
import { RoleService } from 'src/app/shared/service/role.service';
import { RoleComponent } from '../role/role.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

 // declartion
 dataSource = new MatTableDataSource<Role>();

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
   private roleService: RoleService,
   public dialog: MatDialog
 ) {}

 ngOnInit(): void {
   this.loadRoles();
 }

 ngAfterViewInit() {
   this.paginator.page.subscribe((event) =>
     this.roleService
       .getAllRolesPg(event.pageIndex, event.pageSize)
       .subscribe((data: any) => {
         this.dataSource.data = data.content;
         this.pageIndex = data.number;
         this.pageSize = data.size;
         this.length = data.totalElements;
       })
   );
 }

 // load methods
 loadRoles() {
   this.roleService
     .getAllRolesPg(this.pageIndex, this.pageSize)
     .subscribe((data: any) => {
       this.dataSource.data = data.content;
       this.pageIndex = data.number;
       this.pageSize = data.size;
       this.length = data.totalElements;
     });
 }

 // change methods
 sortRoles(sort: Sort) {
   this.dataSource.sort = this.sort;
 }

 filterRoles(event: any) {
   this.dataSource.filter = event.target.value.trim().toLocaleLowerCase();
 }

 // actions methods
 addRole(): void {
   let dialogRef = this.dialog.open(RoleComponent, {
     data: {
       action: 'Add',
       snackMessage: 'Role added successfully',
     },
     width: '600px',
     disableClose: true,
   });

   dialogRef.afterClosed().subscribe(() => {
     this.loadRoles();
   });
 }

 editRole(id: number) {
   let dialogRef = this.dialog.open(RoleComponent, {
     data: {
       id,
       action: 'Edit',
       snackMessage: 'Role updated successfully',
     },
     disableClose: true,
     width: '600px',
   });
   dialogRef.afterClosed().subscribe(() => {
     this.loadRoles();
   });
 }

 deleteRole(id: number) {
   let dialogRef = this.dialog.open(DeleteDialogComponent, {
     data: {
       id,
       entity:'role',
       snackMessage: 'Role deleted successfully',
     },
     disableClose: true,
     width: '400px',
   });

   dialogRef.afterClosed().subscribe(() => {
     this.loadRoles();
   });
 }

}
