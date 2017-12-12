import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;
// properties
  title: string;
  disabledFlag: boolean;
  inputTxt: string;
  username: string;
  password: string;
  verifyPassword: string;
  errorFlag: boolean;
  newUserId: string;
  errorMsg = 'Invalid username or password !';
  error;

  constructor(private userService: UserService, private sharedService: SharedService, private  router: Router) {
  }

  ngOnInit() {
    this.errorFlag = false;
    this.username = '';
    this.password = '';
    this.verifyPassword = '';
  }

  register() {
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    this.verifyPassword = this.registerForm.value.verifyPassword;
    this.userService.findUserByUsername(this.username)
      .subscribe((user: any) => {
        if (user !== null) {
          this.errorMsg = 'User already exists!';
          this.errorFlag = true;
        } else if (this.verifyPassword === this.password) {
          // this.newUserId = Math.random().toString();
          const newUser = {
            username: this.username,
            password: this.password
          };

          this.userService.register(this.username, this.password)
            .subscribe((data: any) => {
                this.router.navigate(['/login']);
              },
              (error: any) => {
                this.error = error._body;
              });
        }
      });
  }
}
