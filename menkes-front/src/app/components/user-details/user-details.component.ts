
import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../../services/UserDetials/user-details.service';  // מייבאים את השירות
import { RequestsUserDto } from 'src/app/models/RequestsUserDto';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  users: RequestsUserDto[]=[];

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
    this.users = this.users.filter(user =>( user.user_code !== userCode)||(user.course_code !== courseCode));
    
  }
}
