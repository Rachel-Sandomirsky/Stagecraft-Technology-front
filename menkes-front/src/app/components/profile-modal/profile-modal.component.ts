import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.css']
})
export class ProfileModalComponent {
  @Input() user: any; 
  @Output() close = new EventEmitter<void>(); 

  constructor(private userService: UserService) {}

  closeModal() {
    this.close.emit(); 
  }

  onLogout() {
    this.userService.logout(); 
    this.closeModal(); 
  }
}
