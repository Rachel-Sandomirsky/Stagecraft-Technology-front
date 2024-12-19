import { ApplicationConfig, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';
//import { BaseService } from '../base/base.service';
import { environment } from 'src/environments/environment.prod';
//import { ErrorService } from '../error/error.service';
//import { TextsService } from '../Texts/texts.service';
import { RequestsUserDto } from 'src/app/models/RequestsUserDto';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  private requestsUserDto :RequestsUserDto[]=[];
  private apiUrl = `${environment.apiUrl}`;
  constructor(private apiService: ApiService) 
  {

  }

  

  getUnapprovedUsers() {

    return this.apiService.get<RequestsUserDto[]>(`${this.apiUrl}/dashboard/awaitingApproval`);
  }

  approveUser(user_Code: number,course_Code:number) {
    return this.apiService.post(`${this.apiUrl}/dashboard/UserConfirmation`, {user_code:user_Code,course_code:course_Code});
  }
}