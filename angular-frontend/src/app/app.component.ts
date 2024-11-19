import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<h1>{{ message }}</h1>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  message = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:3000/api/hello', { responseType: 'text' })
      .subscribe((response) => {
        this.message = response;
      });
  }
}
