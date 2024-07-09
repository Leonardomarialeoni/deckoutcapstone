import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Card } from './app/interfaces/card.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getCards(): Observable<any> {
    let cardArray: Card[] = [];
    return this.http
      .get(
        'https://marvelsnapzone.com/getinfo/?searchtype=cards&searchcardstype=true'
      )
      .pipe(
        map((res: any) => {
          res.success.cards.map((card: Card) => {
            if (card.type === 'Character' && card.source !== 'None') {
              cardArray.push(card);
            }
          });
          return cardArray;
        })
      );
  }

  getCurrentUser() {
    return {
      nome: '',
      cognome: '',
      email: 'leonardo@leoni.it',
      username: 'Secco',
      password: 'secco1992',
      id: 1,
      collezione: [],
    };
  }
}
