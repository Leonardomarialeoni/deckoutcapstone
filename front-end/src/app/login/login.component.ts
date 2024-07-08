import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { Register } from '../interfaces/register.interface';
import { LocalStorageService } from '../services/LocalStorageService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule]
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  };

  signupData: Register = {
    username: '',
    name: '',
    email: '',
    password: ''
  };

  constructor(private router: Router, private authSrv: AuthService, private localStorageService: LocalStorageService) {}

  login() {
    console.log(this.loginData);
    try {
      this.authSrv.login(this.loginData);
      this.localStorageService.setItem('token',JSON.stringify(this.loginData));
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  onSubmit() {
    console.log(this.signupData);
    try {
      this.authSrv.signup(this.signupData).subscribe(() => {
        const currentUser = {
          nome: "Leonardo",
          cognome: "Leoni",
          email: this.signupData.email,
          username: this.signupData.username,
          password: this.signupData.password,
          id: 123,
          collezione: [1, 42, 87]
        };
        this.authSrv.setCurrentUser(currentUser);
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
