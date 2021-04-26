import { Component, OnInit, Input } from '@angular/core';
import { ResourceService } from 'src/app/services/resource/resource.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

  @Input() collectionsList;
  @Input() fromSearchImage;
  collectionLength;
  collectionName: string;
  totalPhotoLabel: string;
  constructor(
    private resourceSrv: ResourceService
  ) { }

  ngOnInit(): void {
    this.getCollectionLength();
    this.totalPhotoLabel = this.resourceSrv.getConstValue('total.phots.label')
  }

  private getCollectionLength(): void {
    if (this.fromSearchImage) {
      this.collectionLength = this.collectionsList.imageArray.length;
      this.collectionName = this.collectionsList.name;
    } else {
      this.collectionLength = this.collectionsList.preview_photos.length;
      this.collectionName = this.collectionsList.title;
    }
  }

  getSecondURL(data): string {
    if (this.fromSearchImage) {
      return data.imageArray[data.imageArray.length - 2] === undefined ? '' : data.imageArray[data.imageArray.length - 2].urls.small;
    } else {
      return data.preview_photos[data.preview_photos.length - 2] === undefined ?
        '' : data.preview_photos[data.preview_photos.length - 2].urls.small;

    }
  }
  getFirstURL(data): string {
    if (this.fromSearchImage) {
      return data.imageArray[data.imageArray.length - 1] === undefined ? '' : data.imageArray[data.imageArray.length - 1].urls.small;

    } else {
      return data.preview_photos[data.preview_photos.length - 1] === undefined ?
        '' : data.preview_photos[data.preview_photos.length - 1].urls.small;
    }

  }
  getThirdURL(data): string {
    if (this.fromSearchImage) {
      return data.imageArray[data.imageArray.length - 3] === undefined ? '' : data.imageArray[data.imageArray.length - 3].urls.small;
    } else {
      return data.preview_photos[data.preview_photos.length - 3] === undefined ?
        '' : data.preview_photos[data.preview_photos.length - 3].urls.small;
    }

  }

}
