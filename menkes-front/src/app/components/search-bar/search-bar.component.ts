import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service'; 

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {

  searchTerm: string = '';
  isProfileModalOpen: boolean = false;

  @Output() search = new EventEmitter<string>(); 
  @Output() closeModal = new EventEmitter<void>();
  @Output() openLogin = new EventEmitter<void>();
  @Output() openSignup = new EventEmitter<void>();

  constructor(
    private router: Router,
    public userService: UserService,
    private searchService: SearchService
  ) {}

  onLogoClick(): void {
    this.router.navigate(['']); 
  }

  onLogout(): void {
    this.userService.logout(); 
    this.isProfileModalOpen = false;
  }

  onSearch(searchTerm: string): void { 
    if (searchTerm) {
      console.log("Searching for: ", searchTerm);     
      this.searchService.updateSearchTerm(searchTerm);
    }
  }

  onLoginClick() {
    this.openLogin.emit();
  }

  onSignupClick() {
    this.openSignup.emit();
  }

  toggleProfileModal() {
    this.isProfileModalOpen = !this.isProfileModalOpen;
  }

  close() {
    this.closeModal.emit();
  }
}
