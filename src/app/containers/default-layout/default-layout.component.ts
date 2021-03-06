import {Component} from '@angular/core';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  constructor(private router: Router) {}


  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout(){
    localStorage.removeItem("token")
    AppComponent.apiServerUrl=""
    this.router.navigate(["login"])
  }

}
