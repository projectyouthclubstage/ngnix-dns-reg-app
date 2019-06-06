import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteListComponent } from './route-list/route-list.component';
import { RouteAddComponent } from './route-add/route-add.component';

const routes: Routes = [  
  { path: 'show', component: RouteListComponent },
{ path: 'add',      component: RouteAddComponent },
{ path: '',
  redirectTo: '/show',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
