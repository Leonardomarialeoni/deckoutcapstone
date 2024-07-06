import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../../interfaces/card.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() card!: Card;
  @Input() isInCollection!: boolean;
  @Output() isCardClicked = new EventEmitter<number>();

  toggleCard() {
    this.isCardClicked.emit(this.card.cid);
  }
}

