import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  activeTab: string = 'requests';

  constructor(private router: Router) {}

  selectTab(tab: string) {
    this.activeTab = tab;
  }
  navigateToAddCourse() {
    this.router.navigate(['/add-course']);
  }
}
