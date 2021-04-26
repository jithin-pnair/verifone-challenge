import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { AddToFavouriteComponent } from '../add-to-favourite/add-to-favourite.component';
import { Router } from '@angular/router';
import { state } from '@angular/animations';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.css']
})
export class ShowImageComponent implements OnInit, OnChanges {
  @Input() imageDetails;
  @Input() idHomeScreen;
  imageDetailsList;
  @Output() emitAuthorEvent = new EventEmitter();
  @Output() opendailog = new EventEmitter();

  constructor() {
  }
  ngOnInit(): void {
  }
  ngOnChanges(): any {
    this.imageDetailsList = this.imageDetails;
  }

  redirectToAuthor(item): any {
    this.emitAuthorEvent.emit(item);
  }

  addtoFavourite(imageDetails): void {
    this.opendailog.emit(imageDetails);
  }
}
