import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Vacation } from 'src/app/shared/model/vacation';
import { Employee } from 'src/app/shared/model/employee';
import { VacationStatus } from 'src/app/shared/model/vacation-status';
import { VacationService } from 'src/app/shared/service/vacation.service';
import { LoginService } from "src/app/shared/service/login.service";

@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.css']
})
export class VacationComponent implements OnInit {
 // declartion
 public vacationForm!: FormGroup;
 public vacationObj: Vacation = new Vacation();

 constructor(
   private formBuilder: FormBuilder,
   private vacationService: VacationService,
   private loginService: LoginService,
   public dialogRef: MatDialogRef<VacationComponent>,
   private snackBar: MatSnackBar,
   @Inject(MAT_DIALOG_DATA) public data: any
 ) {}

 ngOnInit(): void {
   this.createForm();
   if(this.data.id){
     this.loadVacationById(this.data.id);
   }
 }

 createForm() {
   this.vacationForm = this.formBuilder.group({
     duration: [null, [Validators.required]],
     startDate: [null, [Validators.required]],
     endDate: [null, [Validators.required]],
     comment: [null, [Validators.required]],
   });
 }

 // load methods
 loadVacationById(id: number) {
   this.vacationService.getVacationByid(id).subscribe((data: Vacation) => {
     this.vacationObj = new Vacation();
     this.vacationObj = data;
     this.vacationForm.controls.duration.setValue(this.vacationObj.duration);
     this.vacationForm.controls.startDate.setValue(this.vacationObj.startDate);
     this.vacationForm.controls.endDate.setValue(this.vacationObj.endDate);
     this.vacationForm.controls.comment.setValue(this.vacationObj.comment);
   });
 }

 // actions methods
 saveVacation() {
   this.vacationObj.employee = new Employee(this.loginService.getLoggedUsername());
   this.vacationObj.duration = this.vacationForm.controls.duration.value;
   this.vacationObj.comment = this.vacationForm.controls.comment.value;
   this.vacationObj.startDate = this.vacationForm.controls.startDate.value;
   this.vacationObj.endDate = this.vacationForm.controls.endDate.value;
   this.vacationObj.vacationStatus = new VacationStatus(1);// Pending
   this.vacationObj.requestDate = new Date();
   this.vacationService.saveVacation(this.vacationObj).subscribe((data: any) => {
     this.dialogRef.close();

     this.snackBar.open(this.data.snackMessage, '', {
       duration: 3000,
     });
   });
 }
}
