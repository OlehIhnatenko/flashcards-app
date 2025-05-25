import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { Card, CardSet } from '../models/card-set.model';

@Injectable({ providedIn: 'root' })
export class CardSetService {
  private sets: CardSet[] = [];
  private cards: Card[] = [];

  private sets$ = new BehaviorSubject<CardSet[]>([]);

  getCardSets$() {
    return this.sets$.asObservable();
  }

  addSet(title: string, description?: string): CardSet {
    const newSet: CardSet = {
      id: uuid(),
      title,
      description,
      createdAt: new Date()
    };
    this.sets.push(newSet);
    this.sets$.next(this.sets);
    return newSet;
  }

  removeSet(id: string) {
    this.sets = this.sets.filter((s) => s.id !== id);
    this.cards = this.cards.filter((c) => c.setId !== id);
    this.sets$.next(this.sets);
  }

  getSetById(id: string): CardSet | undefined {
    return this.sets.find((s) => s.id === id);
  }

  getCardsForSet(setId: string): Card[] {
    return this.cards.filter((card) => card.setId === setId);
  }

  addCard(setId: string, data: Omit<Card, 'id' | 'setId'>) {
    const card: Card = {
      id: uuid(),
      setId,
      ...data
    };
    this.cards.push(card);
  }

  removeCard(cardId: string) {
    this.cards = this.cards.filter((c) => c.id !== cardId);
  }
}
