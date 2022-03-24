import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    NavigationComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule
  ],
  exports: [
    NavigationComponent,
    FooterComponent

  ]
})
export class LandingModule { }
