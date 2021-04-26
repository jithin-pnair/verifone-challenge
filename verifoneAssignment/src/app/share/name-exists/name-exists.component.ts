import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResourceService } from 'src/app/services/resource/resource.service';

@Component({
  selector: 'app-name-exists',
  templateUrl: './name-exists.component.html',
  styleUrls: ['./name-exists.component.css']
})
export class NameExistsComponent implements OnInit {
  Lable: string;
  okBtnLabel: string;

  constructor(
    private dialogref: MatDialogRef<NameExistsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private resourceSrv: ResourceService
  ) { }

  ngOnInit(): void {
    this.Lable = this.resourceSrv.getConstValue('name.already exist.lable');
    this.okBtnLabel =  this.resourceSrv.getConstValue('ok.button.lable');
  }

  onClickOk(): any {
    this.dialogref.close();
  }
}
