import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardSetService } from '../../services/card-set.service';
import { Card } from '../../models/card-set.model'; // или отдельная модель

@Component({
  selector: 'app-study-mode',
  imports: [NgIf],
  templateUrl: './study-mode.component.html',
  styleUrl: './study-mode.component.scss',
  standalone: true
})
export class StudyModeComponent {
  setId = '';
  setTitle = '';
  cards: Card[] = [];
  index = 0;
  flipped = false;

  constructor(route: ActivatedRoute, private sets: CardSetService) {
    this.setId = route.snapshot.paramMap.get('id') || '';

    // Получаем набор и его карточки
    this.sets.getSetById(this.setId).subscribe(set => {
      this.setTitle = set.title;
      this.cards = set.cards || [];
    });
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
