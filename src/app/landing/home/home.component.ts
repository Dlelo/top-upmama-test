import { Component, Inject, OnInit } from '@angular/core';
import { TopupmamaService } from 'src/app/service/topupmama.service';
import { User } from '../../dashboard/users/users';
import { DOCUMENT } from '@angular/common';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User;
  public cookieValue!:any

  constructor(
    private topupmamaService: TopupmamaService,
    @Inject(DOCUMENT) private document: Document,
    private cookieService: CookieService

  ) {
    this.user = this.topupmamaService.userValue;

   }

  ngOnInit(): void {
    console.log('user', this.user);
    this.document.cookie = "OursiteJWT";

    const _name = 'OursiteJWT'
    this.cookieValue = this.cookieService.getAll();
    console.log('cookieValue', this.cookieValue);

  }

}
