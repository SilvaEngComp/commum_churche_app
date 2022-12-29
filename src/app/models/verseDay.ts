import { Verse } from './verse';
export class VerseDay {
  id: number;
  day: number;
  month: number;
  startVerse: Verse;
  endVerse: Verse;
  isRead: boolean;
  text: string;
  constructor() {
    this.startVerse = new Verse();
    this.endVerse = new Verse();
  }
}
