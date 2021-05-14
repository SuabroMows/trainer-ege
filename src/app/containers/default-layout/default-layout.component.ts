import { OnInit } from '@angular/core';
import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { INavData } from '@coreui/angular';

import {AuthenticationService} from '../../sevices/authentication.service';
import {navItemsPupil, navItemsTeacher} from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems: INavData[] = [];
  constructor(private router: Router,
              private authenticationService: AuthenticationService) {}

  ngOnInit() {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.session) {
      const roles = currentUser.session.user.roles;
      if (roles.includes('TEACHER')) {
        this.navItems = navItemsTeacher;
        this.router.navigate(['/theme/pupil']);
      } else {
        if (roles.includes('PUPIL')) {
          this.navItems = navItemsPupil;
          this.router.navigate(['/charts']);
        }
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
    this.authenticationService.logout();
  }
}
