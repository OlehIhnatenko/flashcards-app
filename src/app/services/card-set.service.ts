import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CardSet } from '../models/card-set.model';
import { v4 as uuid } from 'uuid';

@Injectable({ providedIn: 'root' })
export class CardSetService {
  private sets: CardSet[] = [];

  private sets$ = new BehaviorSubject<CardSet[]>([]);

  getCardSets$() {
    return this.sets$.asObservable();
  }

  addSet(title: string, description?: string) {
    const newSet: CardSet = {
      id: uuid(),
      title,
      description,
      createdAt: new Date()
    };
    this.sets.push(newSet);
    this.sets$.next(this.sets);
  }

  removeSet(id: string) {
    this.sets = this.sets.filter((set) => set.id !== id);
    this.sets$.next(this.sets);
  }

  getSetById(id: string): CardSet | undefined {
    return this.sets.find((s) => s.id === id);
  }
}
