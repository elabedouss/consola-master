import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VacationStatus } from 'src/app/shared/model/vacation-status';
import { VacationStatusService } from 'src/app/shared/service/vacation-status.service';

@Component({
  selector: 'app-vacation-status',
  templateUrl: './vacation-status.component.html',
  styleUrls: ['./vacation-status.component.css']
})
export class VacationStatusComponent implements OnInit {

 // declartion
 public statusForm!: FormGroup;
 public statusObj: VacationStatus = new VacationStatus();

 constructor(
   private formBuilder: FormBuilder,
   private vacationStatusService: VacationStatusService,
   public dialogRef: MatDialogRef<VacationStatusComponent>,
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
   this.vacationStatusService.getStatusByid(id).subscribe((data: VacationStatus) => {
     this.statusObj = new VacationStatus();
     this.statusObj = data;
     this.statusForm.controls.name.setValue(this.statusObj.name);
   });
 }

 // actions methods
 saveStatus() {
   this.statusObj = new VacationStatus(this.data.id);
   this.statusObj.name = this.statusForm.controls.name.value;

   this.vacationStatusService.saveStatus(this.statusObj).subscribe((data: any) => {
     this.dialogRef.close();

     this.snackBar.open(this.data.snackMessage, '', {
       duration: 3000,
     });
   });
 }


}
