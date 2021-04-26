import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { CollectionsComponent } from './collections/collections.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShowImageComponent } from './show-image/show-image.component';
import { NameExistsComponent } from './name-exists/name-exists.component';




@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [NavComponent, CollectionsComponent, ShowImageComponent, NameExistsComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    FlexLayoutModule
  ],
  exports: [NavComponent, CollectionsComponent, ShowImageComponent]
})
export class SharedModule { }
