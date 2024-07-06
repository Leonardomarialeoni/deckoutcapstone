import { Component, Input } from '@angular/core';
import { Card } from '../interfaces/card.interface';
import { CardlistComponent } from "../components/cardlist/cardlist.component";
import { HttpService } from '../../http.service';
import { noop, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Component({
    selector: 'app-collezione',
    standalone: true,
    templateUrl: './collezione.component.html',
    styleUrl: './collezione.component.scss',
    imports: [CardlistComponent]
})
export class CollezioneComponent {
  cardArray: Card[] = [];
  user!: User;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getCards().pipe(
      tap((res) => {
        this.cardArray = res;
      })
    ).subscribe(noop);

    this.user = this.httpService.getCurrentUser();
  }

 

}
