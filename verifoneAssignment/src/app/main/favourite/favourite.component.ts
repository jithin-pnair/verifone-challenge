import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../services/resource/resource.service';
import { FavouriteService } from '../../services/main/favourite/favourite.service';
import { Router } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as imageReducer from '../../store/reducers/searchImage.reducer';
import { collectionModel } from '../../store/models/collection.model';


@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {
  collectionsListArray: any;
  collectionsLink: any;
  previewImages: any;
  isDisplay = false;
  staticText: any;
  collectionList: any;
  displayFavourite = false;
  isSearchImage = true;
  constructor(
    private resourceServ: ResourceService,
    private favouriteServ: FavouriteService,
    private store: Store<any>,
    private router: Router) { }

  ngOnInit(): void {
    this.getDataFromStore();
    this.initFavoriteResource();
    // this.getCollectionData();
  }

  private getDataFromStore(): void {
    this.store.pipe(select(imageReducer.getCollection)).subscribe((data) => {
      this.collectionList = data;
      this.displayFavourite = true;
      this.collectionsListArray = data;
    });

  }


  getCollectionData(): void {
    this.favouriteServ.getUserCollections().subscribe(
      (res) => {
        this.collectionsListArray = res;
        this.displayFavourite = true;
        res.forEach(element => {
          this.collectionsLink = element.links.photos;
          element.preview_photos.forEach(ele => {
            this.previewImages.push(ele);
          });
        });
      }
    );
  }
  initFavoriteResource(): void {
    this.staticText = {
      labelName: this.resourceServ.getConstValue('favourite.label.name'),
      labelNumber: this.resourceServ.getConstValue('favourite.label.number')
    };
  }

  openFavouriteDetail(collections): void {
    this.router.navigate(['favourite/favouriteDetails'], { state: { data: collections } });
  }

  searchImages($event): void {
    if ($event.trim().length !== 0) {
      this.router.navigate(['home/images'], { state: { data: $event } });
    }

  }


}
