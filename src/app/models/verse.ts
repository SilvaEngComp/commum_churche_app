import { Book } from './book';
import { UserVerseMark } from './userVerseMark';

export class Verse {
  id: number;
  version: string;
  testament: string;
  book: Book;
  chapter: number;
  verse: number;
  text: string;
  userVerseMark: UserVerseMark;
  constructor() {}
}
