import { NgIf } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LocalStorageService } from '../services/LocalStorageService.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements AfterViewInit {
  constructor (private localeStorageService: LocalStorageService) {};
  
  isLogged: boolean = false;

  ngAfterViewInit(): void {
   
      if (this.localeStorageService.getItem('token')) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
  }

  logOut() {
    this.localeStorageService.removeItem('token')
    console.log("eccomi")
  }
}
