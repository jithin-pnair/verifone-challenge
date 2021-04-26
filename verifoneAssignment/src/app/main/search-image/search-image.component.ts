import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchImageService } from '../../services/main/search-image/search-image.service';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { MatPaginator } from '@angular/material/paginator';
import { NumberInput } from '@angular/cdk/coercion';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddToFavouriteComponent } from './add-to-favourite/add-to-favourite.component';

@Component({
  selector: 'app-search-image',
  templateUrl: './search-image.component.html',
  styleUrls: ['./search-image.component.css']
})
export class SearchImageComponent implements OnInit {

  searchedImages;
  noResultsFound = false;
  showPagination;
  noRecordsFoundText: string;
  paginationLenght: number;
  pageSize: number;
  pageSizeOptions: number[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  searchImage = false;
  searchValue = '';


  constructor(
    private searchImageSrv: SearchImageService,
    private resourceSrv: ResourceService,
    private dialog: MatDialog,
    private route: Router) {

  }

  ngOnInit(): void {
    this.initResource();
    let data = '';
    let pageSize: number;
    if (history.state === null) {
      data = '';
      pageSize = this.pageSizeOptions[this.pageSizeOptions.length - 1];
    } else {
      if (history.state.data === undefined) {
        data = '';
        pageSize = this.pageSizeOptions[this.pageSizeOptions.length - 1];
      } else {
        data = history.state.data;
        pageSize = this.pageSizeOptions[0];
      }
    }

    this.getImageData(data,
      1, pageSize,
      false, data === '' ? true : false);
    this.searchValue = data;
    this.searchKey = data;
  }

  private initResource(): void {
    this.noRecordsFoundText = this.resourceSrv.getConstValue('showImage.image.not.found.message');
    this.pageSize = this.resourceSrv.getConstValue('search.image.pageSize');
    this.pageSizeOptions = this.resourceSrv.getConstValue('search.image.pageIndex');

  }
  private getImageData(key, pageIndex, pageSize, paginationValue, isHome): void {
    this.noResultsFound = false; this.searchImage = false;
    this.showPagination = paginationValue;
    this.searchImageSrv.getImageList(key, pageIndex, pageSize).subscribe(
      (res) => {
        this.searchedImages = res.results;
        this.searchImage = true;
        this.paginationLenght = res.total;
        if (this.paginationLenght > this.pageSize) {
          isHome ? this.showPagination = false : this.showPagination = true;
        }
        if (this.searchedImages.length === 0) {
          this.noResultsFound = true;
        }
      }
    );
  }

  searchImages(searchKey): void {
    if (searchKey === null || searchKey === undefined) {
      this.searchKey = '';
    }
    this.searchKey = searchKey;
    this.getImageData(searchKey, 1, this.pageSize, false, false);
  }

  pageEvent(): void {
    this.getImageData(this.searchKey, this.paginator.pageIndex + 1, this.paginator.pageSize, true, false);
  }

  openDailog(imageDetails): void {
    this.dialog.open(AddToFavouriteComponent, {
      data: imageDetails,
      height: '560px',
      width: '880px',
      disableClose: true
    });
  }

  redirectToAuthor(item): void {
    sessionStorage.setItem('isClickedAuthor', 'true');
    this.route.navigate(['author/authorDetails'], { state: { data: item } });
  }

}
