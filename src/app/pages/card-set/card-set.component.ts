import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardSetService } from '../../services/card-set.service';
import { CardSet } from '../../models/card-set.model';

@Component({
  selector: 'app-card-set',
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './card-set.component.html',
  styleUrl: './card-set.component.scss'
})
export class CardSetComponent {
  setTitle = '';

  cards: {
    frontText?: string;
    backText?: string;
    frontImage?: string; // base64
    backImage?: string;
  }[] = [];

  frontText = '';
  backText = '';
  frontImage?: string;
  backImage?: string;

  constructor(
    private route: ActivatedRoute,
    private sets: CardSetService
  ) {
    const id = this.route.snapshot.paramMap.get('id') || '';
    const set: CardSet | undefined = this.sets.getSetById(id);
    this.setTitle = set?.title || '(Без названия)';
  }

  addCard() {
    const hasContent =
      this.frontText?.trim() || this.backText?.trim() || this.frontImage || this.backImage;

    if (!hasContent) return;

    this.cards.push({
      frontText: this.frontText.trim(),
      backText: this.backText.trim(),
      frontImage: this.frontImage,
      backImage: this.backImage
    });

    this.frontText = '';
    this.backText = '';
    this.frontImage = undefined;
    this.backImage = undefined;
  }

  removeCard(index: number) {
    this.cards.splice(index, 1);
  }

  onImageUpload(event: Event, side: 'front' | 'back') {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      if (side === 'front') this.frontImage = result;
      else this.backImage = result;
    };
    reader.readAsDataURL(file);
  }
}
