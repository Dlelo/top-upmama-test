import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../helpers/auth.guard';
import { MyAccountComponent } from './my-account/my-account.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    path: 'account',
    component: MyAccountComponent
  },
  {
    canActivate: [AuthGuard],
    path: 'users',
    component: UsersComponent
  },
  {
    canActivate: [AuthGuard],
    pathMatch: 'full',
    path: 'users/update/:id',
    component: UpdateUserComponent
  },
  {
    canActivate: [AuthGuard],
    pathMatch: 'full',
    path: 'details/:id',
    component: UserDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
