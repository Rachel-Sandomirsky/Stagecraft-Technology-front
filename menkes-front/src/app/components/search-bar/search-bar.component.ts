import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service'; 
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  searchTerm: string = '';
  
  @Output() search = new EventEmitter<string>(); // Emit search term to parent component

  constructor(private router: Router, public userService: UserService) {}

  onLogoClick(): void {
    this.router.navigate(['/']);  // Navigate to home page
  }
  onLogout():void{
    this.userService.logout();
  }
  // Emit the search term to the parent component
  onSearch(searchTerm: string | null): void {
    if (searchTerm) {
      console.log("Searching for: ", searchTerm); // For debugging purposes
      this.search.emit(searchTerm);  // Emit the search term to the parent component
    }
  }

  onLoginClick() {
    this.router.navigate(['/login']); 
    console.log("user name", this.userService.user$) // Navigate to login page
  }

  onSignupClick() {
    this.router.navigate(['/signup']);  // Navigate to signup page
  }
}
