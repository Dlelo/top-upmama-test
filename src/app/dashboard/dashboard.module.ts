import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MyAccountComponent } from './my-account/my-account.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule, NgbPaginationModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersComponent } from './users/users.component';
import { NgbdSortableHeader } from './users/table-complete/sortable.directive';
import { UpdateUserComponent } from './update-user/update-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyBootstrapModalComponent } from './my-bootstrap-modal/my-bootstrap-modal.component';
import { UserDetailsComponent } from './user-details/user-details.component';


@NgModule({
  declarations: [
    MyAccountComponent,
    UsersComponent,
    NgbdSortableHeader,
    UpdateUserComponent,
    MyBootstrapModalComponent,
    UserDetailsComponent,


  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgbModule,
    FormsModule,
    NgbModule,
    NgbPaginationModule,
    ReactiveFormsModule
  ],
  providers: [UpdateUserComponent, MyBootstrapModalComponent, NgbActiveModal,DecimalPipe],
  entryComponents: [MyBootstrapModalComponent],

})
export class DashboardModule { }
