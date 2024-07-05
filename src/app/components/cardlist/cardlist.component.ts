import { Component, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Card } from '../../interfaces/card.interface';
import { NgFor } from '@angular/common';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-cardlist',
  standalone: true,
  templateUrl: './cardlist.component.html',
  styleUrls: ['./cardlist.component.scss'],
  imports: [CardComponent, NgFor],
})
export class CardlistComponent {
  @Input() cardArray!: Card[];
  @Input() user!: User;

  ngOnInit() {
    this.sortCards();
  }

  isCardInUserCollection(card: Card): boolean {
    return this.user?.collezione.some(userCardId => userCardId === card.cid);
  }

  updateUserCollection(cardId: number) {
    const index = this.user.collezione.indexOf(cardId);
    if (index > -1) {
      this.user.collezione.splice(index, 1);
    } else {
      this.user.collezione.push(cardId);
    }
    this.sortCards();
  }

  sortCards() {
    this.cardArray.sort((a, b) => {
      const aInCollection = this.isCardInUserCollection(a);
      const bInCollection = this.isCardInUserCollection(b);
      if (aInCollection && !bInCollection) {
        return -1;
      } else if (!aInCollection && bInCollection) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}

