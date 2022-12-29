import { BibleProgramMap } from './bibleProgramMap';
export class BibleReaderProgram {
  id: number;
  name: string;
  status: string;
  program: BibleProgramMap[];

  constructor() {
    this.id = 1;
  }
}
