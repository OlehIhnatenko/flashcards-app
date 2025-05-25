export interface CardSet {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
}

export interface Card {
  id: string;
  setId: string;
  frontText?: string;
  backText?: string;
  frontImage?: string;
  backImage?: string;
  cards?: any;
}