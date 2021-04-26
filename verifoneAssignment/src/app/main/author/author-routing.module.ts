import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthorComponent } from './author.component';

const routes: Routes = [
  {
    path: 'authorDetails',
    component: AuthorComponent
  },
  {
    path: '',
    redirectTo: 'authorDetails',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule { }
