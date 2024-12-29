import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})

export class SideMenuComponent {
  isAdmin: boolean = false;
  isCustomer : boolean = false;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.isAdmin = user?.role === 'admin';
      this.isCustomer = user?.role === 'customer';
    });
  }
}
