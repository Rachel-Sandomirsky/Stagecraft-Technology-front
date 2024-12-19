
import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../../services/UserDetials/user-details.service';  // מייבאים את השירות
import { RequestsUserDto } from 'src/app/models/RequestsUserDto';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  users: RequestsUserDto[]=[
    //{ "user_name": "john_doe", "password_hash": "hashed_password_123", "email": "john.doe@example.com", "user_code": 1001, "course_code": 101, "title": "Mr" },
    //{ "user_name": "jane_smith", "password_hash": "hashed_password_456", "email": "jane.smith@example.com", "user_code": 1002, "course_code": 102, "title": "Ms" },
    //{ "user_name": "michael_jones", "password_hash": "hashed_password_789", "email": "michael.jones@example.com", "user_code": 1003, "course_code": 103, "title": "Dr" },
    //{ "user_name": "emily_davis", "password_hash": "hashed_password_101", "email": "emily.davis@example.com", "user_code": 1004, "course_code": 104, "title": "Mrs" },
    //{ "user_name": "alex_lee", "password_hash": "hashed_password_202", "email": "alex.lee@example.com", "user_code": 1005, "course_code": 105, "title": "Mx" }
  ];

  constructor(private userDetailsService: UserDetailsService) { }  // מזריקים את השירות לקומפוננטה

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userDetailsService.getUnapprovedUsers().subscribe({
      next: (data: RequestsUserDto[]) => { 
        console.log('success');
        // Defined data type
        this.users= data;
      },
      error: (error) => {
       console.error(error);
      }
    });
  
        
  }

  approveUser(userCode: number,courseCode:number): void {  

    this.userDetailsService.approveUser(userCode,courseCode).subscribe({
      next: (data: any) => { 
        console.log('success');
        // Defined data type
        
      },
      error: (error) => {
       console.error(error);
      }
    });
    this.users = this.users.filter(user =>( user.user_code !== userCode)&&(user.course_code !== courseCode));
    
  }
}
