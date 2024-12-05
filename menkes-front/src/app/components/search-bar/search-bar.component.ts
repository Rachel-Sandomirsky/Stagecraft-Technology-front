import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<string>(); // אירוע חיפוש
  searchTerm: string = ''; // ערך שדה החיפוש

  onSearch(): void {
    this.search.emit(this.searchTerm); // שליחת האירוע עם ערך החיפוש
  }
  onLogoClick(): void {
    console.log('Logo clicked!');
  }
  
}
