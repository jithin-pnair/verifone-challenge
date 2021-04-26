import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FavouriteComponent } from './favourite.component';
import { ManageCollectionComponent } from './manage-collection/manage-collection.component';

const routes: Routes = [{
  path: 'myFavourite',
  component: FavouriteComponent
},
{
  path: 'favouriteDetails',
  component: ManageCollectionComponent
}, {
  path: '',
  redirectTo: 'myFavourite',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavouriteRoutingModule { }
