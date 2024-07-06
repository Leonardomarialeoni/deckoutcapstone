import { Component, OnInit } from '@angular/core';
import { Card } from '../interfaces/card.interface';
import { CardlistComponent } from "../components/cardlist/cardlist.component";
import { HttpService } from '../../http.service';
import { map, noop, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CardlistComponent, CommonModule, HttpClientModule] 
})
export class HomeComponent implements OnInit {
  cardArray: Card[] = [];

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getCards().pipe(
      tap((res) => {
        this.cardArray = res;
      })
    ).subscribe(noop);
  }
}
