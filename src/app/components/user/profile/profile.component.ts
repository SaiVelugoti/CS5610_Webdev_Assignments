import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  userId: string;
  user = {};
  username: string;
  email: string;
  firstName: string;
  lastName: string;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
        }
      );
    this.user = this.userService.findUserById(this.userId);
    this.username = this.user['username'];
    this.email = this.user['email'];
    this.firstName = this.user['firstName'];
    this.lastName = this.user['lastName'];
  }
  updateUser() {
    this.user['firstName'] = this.firstName;
    this.user['lastName'] = this.lastName;
    this.userService.updateUser(this.userId, this.user);
  }
}
