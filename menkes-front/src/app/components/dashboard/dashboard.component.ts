import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  activeTab: string = '';
  constructor(private router: Router) {}
  selectedTab: string = 'courses';
  selectTab(tab: string) {
    this.activeTab = tab;
  }
}
