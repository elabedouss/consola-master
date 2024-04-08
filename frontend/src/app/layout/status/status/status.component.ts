import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Status } from 'src/app/shared/model/status';
import { StatusService } from 'src/app/shared/service/status.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  // declartion
  public statusForm!: FormGroup;
  public statusObj: Status = new Status();

  constructor(
    private formBuilder: FormBuilder,
    private statusService: StatusService,
    public dialogRef: MatDialogRef<StatusComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.loadStatusById(this.data.id);
  }

  createForm() {
    this.statusForm = this.formBuilder.group({
      name: [null, [Validators.required]],
    });
  }

  loadStatusById(id: number) {
    this.statusService.getStatusByid(id).subscribe((data: Status) => {
      this.statusObj = new Status();
      this.statusObj = data;
      this.statusForm.controls.name.setValue(this.statusObj.name);
    });
  }

  // actions methods
  saveStatus() {
    this.statusObj = new Status(this.data.id);
    this.statusObj.name = this.statusForm.controls.name.value;

    this.statusService.saveStatus(this.statusObj).subscribe((data: any) => {
      this.dialogRef.close();

      this.snackBar.open(this.data.snackMessage, '', {
        duration: 3000,
      });
    });
  }

}
