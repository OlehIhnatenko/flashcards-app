import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardSetService } from '../../services/card-set.service';
import { CardSet } from '../../models/card-set.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  sets: CardSet[] = [];

  title = '';
  description = '';

  constructor(private cardSetService: CardSetService) {
    this.cardSetService.getCardSets$().subscribe((data) => (this.sets = data));
  }

  add() {
    if (!this.title.trim()) return;
    this.cardSetService.addSet(this.title, this.description);
    this.title = '';
    this.description = '';
  }

  remove(id: string) {
    this.cardSetService.removeSet(id);
  }
}
