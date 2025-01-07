import { Component, OnInit } from '@angular/core';
import { UserQuizz } from 'src/app/models/userQuizz';
import { UserDashboardService } from 'src/app/services/user-dashboard.service';

@Component({
  selector: 'app-user-achievements',
  templateUrl: './user-achievements.component.html',
  styleUrls: ['./user-achievements.component.css']
})
export class UserAchievementsComponent implements OnInit {
  achievements: UserQuizz[] = [];
  isLoading = true;

  constructor(private userDashboardService: UserDashboardService) {}

  ngOnInit(): void {
    this.fetchAchievements();
  }

  fetchAchievements() {
    this.userDashboardService.getUserAchievements().subscribe(
      (data: UserQuizz[]) => {
        this.achievements = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Failed to fetch achievements', error);
        this.isLoading = false;
      }
    );
  }
}
