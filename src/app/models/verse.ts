import { UserVerseMark } from './userVerseMark';

export class Verse {
  id: number;
  version: string;
  testament: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
  userVerseMark: UserVerseMark;
  constructor() {}
}
