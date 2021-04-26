import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { Store, select } from '@ngrx/store';
import { DeleteCollection, UpdateCollection } from 'src/app/store/actions/searchImage.actions';
import { Router } from '@angular/router';
import { FavouriteService } from 'src/app/services/main/favourite/favourite.service';
// import { Store, select } from '@ngrx/store';
import * as imageReducer from '../../../../store/reducers/searchImage.reducer';
import { NameExistsComponent } from 'src/app/share/name-exists/name-exists.component';



@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.css']
})
export class EditCollectionComponent implements OnInit {
  createCollecttonForm: FormGroup;
  initResourcesValue: {
    closeMatIcon: string;
    editHeading: string;
    nameLabel: any;
    descriptionLabel: any;
    deleteButton: any;
    updateNameButton: any;
    inputLength: string;
    textareaLength: string;
    alertMsg: string;
  };
  collectionList = [];
  constructor(
    private dailogRef: MatDialogRef<EditCollectionComponent>,
    private resourceSrv: ResourceService,
    private store: Store<any>,
    private route: Router,
    private dialog: MatDialog,
    private favouriteSrv: FavouriteService,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit(): void {
    this.gettingCollectionList();
    this.initResources();
    this.createCollecttonForm = new FormGroup({
      name: new FormControl('', [Validators.required, this.spaceValidator]),
      desc: new FormControl('')
    });
    this.patchValue();
  }

  spaceValidator(control: AbstractControl): any {
    if (control && control.value && !control.value.replace(/\s/g, '').length) {
      control.setValue('');
      console.log(control.value);
      return { required: true }
    }
    else {
      return null;
    }
  }

  private patchValue(): void {
    this.createCollecttonForm.patchValue({
      name: this.data.name,
      desc: this.data.desc
    });
  }

  deleteCollection(): void {
    this.store.dispatch(new DeleteCollection(this.createCollecttonForm.value.name));
    this.dailogRef.close();
    this.route.navigateByUrl('favourite/myFavourite');
  }

  updateName(): void {
    let isExistsName = false;
    this.collectionList.forEach(element => {
      if (element.name === this.createCollecttonForm.value.name &&
        this.data.name !== this.createCollecttonForm.value.name) {
        return isExistsName = true;
      } else {
        return isExistsName = false;
      }
    });
    if (!isExistsName) {
      this.store.dispatch(new UpdateCollection({
        existingName: this.data.name, updatedName:
          this.createCollecttonForm.value.name, desc: this.createCollecttonForm.value.desc
      }));
      this.dailogRef.close();
      this.route.navigateByUrl('favourite/myFavourite');
    } else {
      this.dialog.open(NameExistsComponent, {
        width: '550px',
        disableClose: true,
        data: this.createCollecttonForm.value.name
      });
    }
  }
  closeDialog(): void {
    this.dailogRef.close();
  }



  private initResources(): void {
    this.initResourcesValue = {
      closeMatIcon: this.resourceSrv.getConstValue('editAlbum.maticon.close'),
      editHeading: this.resourceSrv.getConstValue('editAlbum.heading.label'),
      nameLabel: this.resourceSrv.getConstValue('editAlbum.name.label'),
      descriptionLabel: this.resourceSrv.getConstValue('editAlbum.description.label'),
      deleteButton: this.resourceSrv.getConstValue('editAlbum.delete.button'),
      updateNameButton: this.resourceSrv.getConstValue('editAlbum.updatename.close'),
      inputLength: this.resourceSrv.getConstValue('favourite.input.length'),
      textareaLength: this.resourceSrv.getConstValue('favourite.input.length'),
      alertMsg: this.resourceSrv.getConstValue('editAlbum.alertMsg')
    };
  }
  ifExists(): boolean {
    this.store.pipe(select(imageReducer.getCollection)).subscribe((data) => {
      console.log(data, 'data');
      data.forEach(element => {
        if (element.name === this.createCollecttonForm.value.name) {
          return false;
        } else {
          return true;
        }
      });
    });
    return;
  }

  gettingCollectionList(): any {
    this.store.pipe(select(imageReducer.getCollection)).subscribe((data) => {
      this.collectionList = data;
    })

  }
}

