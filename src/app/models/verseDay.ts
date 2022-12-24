import { Verse } from './verse';
export class VerseDay {
  day: number;
  startVerse: Verse;
  endVerse: Verse;
  constructor() {
    this.startVerse = new Verse();
    this.endVerse = new Verse();
  }
}
