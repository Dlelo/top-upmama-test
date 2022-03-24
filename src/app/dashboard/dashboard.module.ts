import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MyAccountComponent } from './my-account/my-account.component';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [
    MyAccountComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
