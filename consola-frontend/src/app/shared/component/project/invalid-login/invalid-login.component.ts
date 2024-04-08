import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-invalid-login",
  templateUrl: "./invalid-login.component.html",
  styleUrls: ["./invalid-login.component.css"],
})
export class InvalidLoginComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<InvalidLoginComponent>) {}

  ngOnInit(): void {}

  cancel(): void {
    this.dialogRef.close();
  }
}
