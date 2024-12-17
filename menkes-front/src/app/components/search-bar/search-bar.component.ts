import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  searchTerm: string = '';
  
  @Output() search = new EventEmitter<string>(); 

  constructor(private router: Router) {}

  onLogoClick(): void {
    this.router.navigate(['/']); 
  }

 
  onSearch(searchTerm: string | null): void {
    if (searchTerm) {
      console.log("Searching for: ", searchTerm); 
      this.search.emit(searchTerm);  
    }
  }

  onLoginClick() {
    this.router.navigate(['/login']);  
  }

  onSignupClick() {
    this.router.navigate(['/signup']);  
  }
}
