
import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../../services/UserDetials/user-details.service';  // מייבאים את השירות
import { RequestsUserDto } from 'src/app/models/RequestsUserDto';
import { Router } from '@angular/router';
import { RequiresToken } from 'src/app/interceptors/TokenDecorator';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  users: RequestsUserDto[]=[];

  constructor(private userDetailsService: UserDetailsService,private userService:UserService ,private router: Router) { }  // מזריקים את השירות לקומפוננטה

  ngOnInit(): void {
    this.fetchUsers();
  }
  @RequiresToken()
  fetchUsers(): void {
    this.userDetailsService.getUnapprovedUsers().subscribe({
      next: (data: RequestsUserDto[]) => { 
        console.log('success');
        // Defined data type
        this.users= data;
      },
      error: (e) => {
        if(e.status===401)
          {
            const currentUrl = this.router.url;
            {
              const currentUrl = this.router.url;
              this.router.navigate(['/reconnect'])
              setTimeout(() => {
               
                this.router.navigate([currentUrl]);
              }, 5000); 
              this.onLogout() ;
            }
            setTimeout(() => {
             
              this.router.navigate([currentUrl]);
            }, 5000); 
            this.userService.logout();
          }
         else console.log("Error ")
      }
    });
  
        
  }
  
  @RequiresToken()
  approveUser(userCode: number,courseCode:number): void {  

    this.userDetailsService.approveUser(userCode,courseCode).subscribe({
      next: (data: any) => { 
        console.log('success');
        // Defined data type
        
      },
      error: (e) => {
        if(e.status===401)
          {
            const currentUrl = this.router.url;
            this.router.navigate(['/reconnect'])
            setTimeout(() => {
             
              this.router.navigate([currentUrl]);
            }, 5000); 
            this.onLogout() ;
          }
         else console.log("Error ")
      }
    });
    this.users = this.users.filter(user =>( user.user_code !== userCode)||(user.course_code !== courseCode));
    
  }
  onLogout() {
    this.userService.logout()
      .subscribe({
        next: (response) => {
          console.log('Logout successfull:', response.message);
          this.userService.userSubject.next(null);
        },
        error: (err) => {
          console.error(
            'Error during logout:',
            err.error?.message || err.message
          );
        },
      });}
}
