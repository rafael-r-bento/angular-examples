import { Component } from '@angular/core';
import { Sidenav } from '../sidenav/sidenav';
import { Sidebar } from '../sidebar/sidebar';
import { Map } from '../map/map';

@Component({
  selector: 'app-dashboard',
  imports: [Sidenav, Sidebar, Map],
  template: `
    <div class="flex-1 flex overflow-hidden relative">
      <app-map />
      <app-sidebar />
      <app-sidenav />
    </div>
  `,
  host: {
    'class': 'flex-1 flex overflow-hidden relative'
  }
})
export class Dashboard {}
