import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // properties
  userId: string;
  user: any;
  username: string;
  firstName: string;
  lastName: string;
  password: string;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute,
              private router: Router, private sharedService: SharedService) {
  }

  // ngOnInit() {
  //   this.activatedRoute.params
  //     .subscribe(
  //       (params: any) => {
  //         this.userId = params['userId'];
  //       }
  //     );
  //   this.userService.findUserById(this.userId)
  //     .subscribe((returnedUser: any) => {
  //       this.username = returnedUser.username;
  //       this.firstName = returnedUser.firstName;
  //       this.lastName = returnedUser.lastName;
  //       this.password = returnedUser.password;
  //     });
  // }

  ngOnInit() {
    console.log('In Profile TS');
    this.user = this.sharedService.user;
    this.username = this.user['username'];
    this.firstName = this.user['firstName'];
    this.lastName = this.user['lastName'];
  }

  logout() {
    this.userService.logout()
      .subscribe((data: any) => {
          this.user = null;
          this.sharedService.user = '';
          this.router.navigate(['/login']);
        }
      );
  }

  updateUser() {
    this.user = {
      _id: this.user._id,
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password
    };
    this.userService.updateUser(this.user._id, this.user)
      .subscribe((user: any) => {
      });
  }
}
