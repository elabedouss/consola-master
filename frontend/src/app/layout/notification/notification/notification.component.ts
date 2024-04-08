import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Notification } from 'src/app/shared/model/notification';
import { NotificationService } from 'src/app/shared/service/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

 // declartion
 public notificationObj: Notification = new Notification();

 constructor(
   private notificationServiceService: NotificationService,
   public dialogRef: MatDialogRef<NotificationComponent>,
   private snackBar: MatSnackBar,
   @Inject(MAT_DIALOG_DATA) public data: any
 ) {}

 ngOnInit(): void {
   if(this.data.id){
     this.loadNotificationById(this.data.id);
   }
 }


 // load methods
 loadNotificationById(id: number) {
   this.notificationServiceService.getNotificationByid(id).subscribe((data: Notification) => {
     this.notificationObj = new Notification();
     this.notificationObj = data;
   });
 }

 // actions methods
 closeNotification() {
     this.dialogRef.close();
 }

}