import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-profilo',
  standalone: true,
  imports: [],
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.scss'
})
export class ProfiloComponent implements OnInit{

user! : User;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
   this.user = this.httpService.getCurrentUser();
  }

  
}
