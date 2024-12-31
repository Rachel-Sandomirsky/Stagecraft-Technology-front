import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = `${environment.apiUrl}/registration`
  constructor(private apiService: ApiService) { }

  async registerForCourse(formData: any){
    return this.apiService.post(this.apiUrl,formData);
  }
}