import { VerseDay } from './verseDay';
import { CustomizedMonth } from './customizedMonth';
export class BibleProgramMap {
  id: number;
  customizedMonth: CustomizedMonth;
  verses: VerseDay[];
  constructor() {
    this.customizedMonth = new CustomizedMonth();
  }
}
