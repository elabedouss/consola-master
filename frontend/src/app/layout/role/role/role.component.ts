import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Role } from 'src/app/shared/model/role';
import { RoleService } from 'src/app/shared/service/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  // declartion
  public roleForm!: FormGroup;
  public roleObj: Role = new Role();

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    public dialogRef: MatDialogRef<RoleComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.loadRoleById(this.data.id);
  }

  createForm() {
    this.roleForm = this.formBuilder.group({
      name: [null, [Validators.required]],
    });
  }

  loadRoleById(id: number) {
    this.roleService.getRoleByid(id).subscribe((data: Role) => {
      this.roleObj = new Role();
      this.roleObj = data;
      this.roleForm.controls.name.setValue(this.roleObj.name);
    });
  }

  // actions methods
  saveRole() {
    this.roleObj = new Role(this.data.id);
    this.roleObj.name = this.roleForm.controls.name.value;

    this.roleService.saveRole(this.roleObj).subscribe((data: any) => {
      this.dialogRef.close();

      this.snackBar.open(this.data.snackMessage, '', {
        duration: 3000,
      });
    });
  }


}
