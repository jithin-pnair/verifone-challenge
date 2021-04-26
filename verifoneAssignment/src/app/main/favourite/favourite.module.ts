import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouriteRoutingModule } from './favourite-routing.module';
import { FavouriteComponent } from './favourite.component';
import { ManageCollectionComponent } from './manage-collection/manage-collection.component';
import { EditCollectionComponent } from './manage-collection/edit-collection/edit-collection.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '../../share/shared.module';
import { StoreModule } from '@ngrx/store';
import { ImageReducer } from '../../store/reducers/searchImage.reducer';
import { EffectsModule, Actions } from '@ngrx/effects';
import { ImageEffect } from '../../store/effects/searchImage.effects';



@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [FavouriteComponent, ManageCollectionComponent, EditCollectionComponent],
  imports: [
    CommonModule,
    FavouriteRoutingModule,
    CommonModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatPaginatorModule,
    FlexLayoutModule,
    MatMenuModule,
    MatButtonModule,
    SharedModule,
    MatButtonModule,
    StoreModule.forFeature('imageSearchResult', ImageReducer),
    EffectsModule.forFeature([ImageEffect])
  ]
})
export class FavouriteModule { }
