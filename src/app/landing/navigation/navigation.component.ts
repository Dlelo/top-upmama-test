import { Component, OnInit } from '@angular/core';
import { TopupmamaService } from '../../service/topupmama.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  toggle: boolean = false;

  constructor(public _topupmamaService: TopupmamaService) { }

  ngOnInit() {

  }

  loggedIn() {
    return this._topupmamaService.loggedIn();
  }

  logoutUser() {
    this._topupmamaService.logoutUser();
    this.toggle = !this.toggle;
  }

  navigationToggle(e: any) {
    this.toggle = !this.toggle;
  }

}
