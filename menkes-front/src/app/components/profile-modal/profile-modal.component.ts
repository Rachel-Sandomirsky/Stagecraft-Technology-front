import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.css']
})
export class ProfileModalComponent {
  @Input() user: any; 
  @Output() close = new EventEmitter<void>(); 

  constructor(private userService: UserService, private router: Router) {}

  closeModal() {
    this.close.emit(); 
  }

  onLogout() {
      this.userService.logout()
        .subscribe({
          next: (response) => {
            console.log('Logout successfull:', response.message);
          },
          error: (err) => {
            console.error(
              'Error during logout:',
              err.error?.message || err.message
            );
          },
        });
        
    this.userService.userSubject.next(null);
    localStorage.removeItem('user');
    this.closeModal(); 
    this.router.navigate(['/']);     
  }

  navigateToDashboard() {
    this.router.navigate(['/user-dashboard']); 
    this.closeModal(); 
  }
}
