import { MemberFormComponent } from './member-form/member-form.component';
import { MemberListComponent } from './member-list/member-list.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"members",
    pathMatch:'full',
    component:MemberListComponent,
  },
  {
    path:'create',
    pathMatch:'full',
    component:MemberFormComponent
  },
  {path:'edit/:id',
    pathMatch:'full',
    component:MemberFormComponent
  },
  {
    path:"",
    pathMatch:'full',
    redirectTo:"members"
  },
  {
    path:"**",
    pathMatch:"full",
    redirectTo:"/"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
