import { Component } from '@angular/core';

import { SIDE_NAV_LIST_ITEMS } from '../constants/app.constants';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {
  public sideNavListItems = SIDE_NAV_LIST_ITEMS;
}
