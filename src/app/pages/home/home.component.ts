import { Component } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardSetService } from '../../services/card-set.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    NgIf,
    NgFor,
    AsyncPipe,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  sets$;

  title = '';
  description = '';

  setToDelete: string | null = null;

  constructor(private cardSetService: CardSetService) {
    this.sets$ = this.cardSetService.getCardSets$();
  }

  add() {
    if (!this.title.trim()) return;

    this.cardSetService.addSet(this.title.trim(), this.description.trim());
    this.title = '';
    this.description = '';
  }

  confirmDelete(id: string) {
    this.setToDelete = id;
  }

  cancelDelete() {
    this.setToDelete = null;
  }

  removeConfirmed() {
    if (this.setToDelete) {
      this.cardSetService.removeSet(this.setToDelete);
      this.setToDelete = null;
    }
  }
}
