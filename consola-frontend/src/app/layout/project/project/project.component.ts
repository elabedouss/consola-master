import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from 'src/app/shared/model/project';
import { Status } from 'src/app/shared/model/status';
import { ProjectService } from 'src/app/shared/service/project.service';
import { StatusService } from 'src/app/shared/service/status.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  // declartion
  public projectForm!: UntypedFormGroup;
  public statusList: Status[] = [];
  public projectObj: Project = new Project();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private statusService: StatusService,
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<ProjectComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadStatus();
    if(this.data.id){
      this.loadProjectById(this.data.id);
    }
  }

  createForm() {
    this.projectForm = this.formBuilder.group({
      status: [null, [Validators.required]],
      name: [null, [Validators.required]],
      shortName: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
    });
  }

  // load methods
  loadStatus() {
    this.statusService.getAllStatus().subscribe((data: any) => {
      this.statusList = data.content;
    });
  }

  loadProjectById(id: number) {
    this.projectService.getProjectByid(id).subscribe((data: Project) => {
      this.projectObj = new Project();
      this.projectObj = data;
      this.projectForm.controls.status.setValue(this.projectObj.status?.id);
      this.projectForm.controls.name.setValue(this.projectObj.name);
      this.projectForm.controls.shortName.setValue(this.projectObj.shortName);
      this.projectForm.controls.startDate.setValue(this.projectObj.startDate);
      this.projectForm.controls.endDate.setValue(this.projectObj.endDate);
    });
  }

  // actions methods
  saveProject() {
    this.projectObj.status = new Status(this.projectForm.controls.status.value);
    this.projectObj.name = this.projectForm.controls.name.value;
    this.projectObj.shortName = this.projectForm.controls.shortName.value;
    this.projectObj.startDate = this.projectForm.controls.startDate.value;
    this.projectObj.endDate = this.projectForm.controls.endDate.value;

    this.projectService.saveProject(this.projectObj).subscribe((data: any) => {
      this.dialogRef.close();

      this.snackBar.open(this.data.snackMessage, '', {
        duration: 3000,
      });
    });
  }
}
