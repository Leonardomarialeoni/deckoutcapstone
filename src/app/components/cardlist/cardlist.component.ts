import { Component, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Card } from '../../interfaces/card.interface';
import { CommonModule, NgFor } from '@angular/common';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-cardlist',
  standalone: true,
  templateUrl: './cardlist.component.html',
  styleUrls: ['./cardlist.component.scss'],
  imports: [CardComponent, CommonModule],
})
export class CardlistComponent {
  @Input() cardArray!: Card[];
  @Input() user!: User;
  @Input() isCollection = false;

  ngOnInit() {
    this.sortCardByCid(this.cardArray);
    this.sortCards();
  }

  isCardInUserCollection(card: Card): boolean {
    return this.user?.collezione.some((userCardId) => userCardId === card.cid);
  }

  updateUserCollection(cardId: number) {
    if (this.isCollection) {
      const index = this.user.collezione.indexOf(cardId);
      if (index > -1) {
        this.user.collezione.splice(index, 1);
      } else {
        this.user.collezione.push(cardId);
      }
      this.sortCardByCid(this.cardArray);
      this.sortCards();
    }
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

  sortCardByCid(cartArray: Card[]): Card[] {
    return cartArray.sort((a, b) => a.cost - b.cost);
  }

  saveCollection() {
    const collection = this.cardArray.filter((card) => {
      return this.isCardInUserCollection(card);
    })
    console.log(collection);
  }
}
