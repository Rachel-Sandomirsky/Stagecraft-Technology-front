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
  
  @Output() search = new EventEmitter<string>(); 
  @Output() closeModal = new EventEmitter<void>(); // לסגירת הטשטוש
  @Output() openLogin = new EventEmitter<void>(); // פתיחת login
  @Output() openSignup = new EventEmitter<void>(); // פתיחת signup

  constructor(private router: Router, public userService: UserService,private searchService:SearchService) {}

  onLogoClick(): void {
    this.router.navigate(['']); 
  }
  onLogout():void{
    this.userService.logout();
  }
  // Emit the search term to the parent component
  onSearch(searchTerm: string): void { 
    if (searchTerm){
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

  close() {
    this.closeModal.emit(); // סוגר את הטשטוש
  }
}
