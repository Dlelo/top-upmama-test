import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyAccountComponent } from './my-account/my-account.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'account',
    component: MyAccountComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    pathMatch: 'full',
    path: 'users/update/:id',
    component: UpdateUserComponent
  },
  {
    pathMatch: 'full',
    path: 'details/:id',
    component: MyAccountComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
