import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardSetService } from '../../services/card-set.service';

@Component({
  selector: 'app-study-mode',
  imports: [NgIf],
  templateUrl: './study-mode.component.html',
  styleUrl: './study-mode.component.scss'
})
export class StudyModeComponent {
  setId = '';
  setTitle = '';
  cards: any[] = [];
  index = 0;
  flipped = false;

  constructor(route: ActivatedRoute, private sets: CardSetService) {
    this.setId = route.snapshot.paramMap.get('id') || '';
    const set = this.sets.getSetById(this.setId);
    this.setTitle = set?.title || '';
    this.cards = this.sets.getCardsForSet?.(this.setId) || [];
  }

  next() {
    this.index = (this.index + 1) % this.cards.length;
    this.flipped = false;
  }

  prev() {
    this.index = (this.index - 1 + this.cards.length) % this.cards.length;
    this.flipped = false;
  }

  toggleFlip() {
    this.flipped = !this.flipped;
  }

  get currentCard() {
    return this.cards[this.index];
  }
}
