import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchImageRoutingModule } from './search-image-routing.module';
import { SearchImageComponent } from '../../main/search-image/search-image.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddToFavouriteComponent } from './add-to-favourite/add-to-favourite.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../share/shared.module';

import { StoreModule } from '@ngrx/store';
import { ImageReducer } from '../../store/reducers/searchImage.reducer';
import { EffectsModule, Actions } from '@ngrx/effects';
import { ImageEffect } from '../../store/effects/searchImage.effects';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [SearchImageComponent, AddToFavouriteComponent],
  imports: [
    CommonModule,
    SearchImageRoutingModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatPaginatorModule,
    FlexLayoutModule,
    MatMenuModule,
    SharedModule,
    MatButtonModule,
    StoreModule.forFeature('imageSearchResult', ImageReducer),
    EffectsModule.forFeature([ImageEffect])
  ]
})
export class SearchImageModule { }
