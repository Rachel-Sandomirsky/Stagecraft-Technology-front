import { ApplicationConfig, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';
//import { BaseService } from '../base/base.service';
import { environment } from 'src/environments/environment.prod';
//import { ErrorService } from '../error/error.service';
//import { TextsService } from '../Texts/texts.service';
import { RequestsUserDto } from 'src/app/models/RequestsUserDto';
import { RequiresToken } from 'src/app/interceptors/TokenDecorator';
import { UserService } from '../user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  private requestsUserDto :RequestsUserDto[]=[];
  private apiUrl = `${environment.apiUrl}`;
  
  constructor(private apiService: ApiService,private user:UserService , private router: Router) 
  {
    
  }
  
  
 
  getUnapprovedUsers() {
   
    return this.apiService.get<RequestsUserDto[]>(`${this.apiUrl}/dashboard/awaitingApproval`);
   
  }

  approveUser(user_Code: number,course_Code:number) {
   
    return this.apiService.post(`${this.apiUrl}/dashboard/UserConfirmation`, {user_code:user_Code,course_code:course_Code});
  }
}