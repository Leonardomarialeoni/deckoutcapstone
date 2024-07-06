import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { Register } from '../interfaces/register.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule]
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  signupData: Register = {
    username: '',
    name: '',
    email: '',
    password: ''
  };

  constructor(private router: Router, private authSrv: AuthService) {}

  login() {
    console.log(this.loginData);
    try {
      this.authSrv.login(this.loginData).subscribe(() => {
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 300);
      });
    } catch (error) {
      console.error(error);
    }
  }

  onSubmit() {
    console.log(this.signupData);
    try {
      this.authSrv.signup(this.signupData).subscribe(() => {
        this.router.navigate(['/login']);
      });
    } catch (error) {
      console.error(error);
    }
  }

  @ViewChild('container') container!: ElementRef;

  signIn() {
    this.container.nativeElement.classList.remove('right-panel-active');
  }

  signUp() {
    this.container.nativeElement.classList.add('right-panel-active');
  }
}
