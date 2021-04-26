import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchImageComponent } from '../search-image/search-image.component';

const routes: Routes = [{ path: 'images', component: SearchImageComponent },
{
  path: '',
  redirectTo: 'images',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchImageRoutingModule { }
