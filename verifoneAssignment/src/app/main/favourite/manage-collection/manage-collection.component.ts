import { Component, OnInit } from '@angular/core';
import { FavouriteService } from '../../../services/main/favourite/favourite.service';
import { MatDialog } from '@angular/material/dialog';
import { EditCollectionComponent } from './edit-collection/edit-collection.component';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-collection',
  templateUrl: './manage-collection.component.html',
  styleUrls: ['./manage-collection.component.css']
})
export class ManageCollectionComponent implements OnInit {

  collestionDetails;

  imgArr: any[];
  collectionDetails: {
    name: string;
    desc: string;
  };
  initResourceValue: { collectionNameHead: any; paragraph: any; imageName: any; };
  constructor(
    private favouriteServ: FavouriteService,
    private resourceSrv: ResourceService,
    private dialog: MatDialog,
    private route: Router) { }

  ngOnInit(): void {
    if (history.state.data === undefined) {
      this.route.navigateByUrl('favourite/myFavourite');
    }
    this.initResource();
    this.collectionDetails = history.state.data;
    console.log(this.collectionDetails, history.state);
    this.imgArr = history.state.data.imageArray;
    this.collectionDetails = {
      name: history.state.data.name,
      desc: history.state.data.desc
    };
  }



  editCollection(): void {
    this.dialog.open(EditCollectionComponent, {
      width: '500px',
      height: '400px',
      disableClose: true,
      data: this.collectionDetails
    });
  }

  private initResource(): void {
    this.initResourceValue = {
      collectionNameHead: this.resourceSrv.getConstValue('manageAlbum.head.albumName'),
      paragraph: this.resourceSrv.getConstValue('manageAlbum.para'),
      imageName: this.resourceSrv.getConstValue('manageAlbum.image.name')
    };
  }

  getImageUrl(data): string {
    return data.links.download + '?force=true';
  }


  searchImages($event): void {
    if ($event.trim().length !== 0) {
      this.route.navigate(['home/images'], { state: { data: $event } });
    }

  }

}
