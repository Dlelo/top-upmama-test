import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { LandingModule } from './landing/landing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertModule } from './components/alert/alert.module';
import { CookieModule } from 'ngx-cookie';



@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    AlertModule,
    LandingModule,
    HttpClientModule,
    NgbModule,
    CookieModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
