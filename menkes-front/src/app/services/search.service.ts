import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTerm = new BehaviorSubject<string>(''); // משתנה חיפוש גלובלי
  currentSearchTerm = this.searchTerm.asObservable();  // Observable לשיתוף המידע

  constructor() {}

  updateSearchTerm(term: string) {
    this.searchTerm.next(term); // עדכון הערך
  }
}
