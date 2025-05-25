import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CardSet, Card } from '../models/card-set.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CardSetService {
  private readonly API = `${environment.apiUrl}/card-sets`;

  constructor(private http: HttpClient) {}

  // Получить все наборы пользователя
  getCardSets$(): Observable<CardSet[]> {
    return this.http.get<CardSet[]>(this.API);
  }

  // Получить один набор
  getSetById(id: string): Observable<CardSet> {
    return this.http.get<CardSet>(`${this.API}/${id}`);
  }

  // Создать новый набор
  addSet(title: string, description?: string): Observable<CardSet> {
    return this.http.post<CardSet>(this.API, { title, description });
  }

  // Удалить набор
  removeSet(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }

  // Добавить карточку в набор
  addCard(setId: string, card: Omit<Card, 'id' | 'setId'>): Observable<Card> {
    return this.http.post<Card>(`${this.API}/${setId}/cards`, card);
  }

  // Получить карточки набора (можно встроено или отдельно)
  getCardsForSet(setId: string): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.API}/${setId}`);
  }

  // Удалить карточку
  removeCard(cardId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/cards/${cardId}`);
  }
}
