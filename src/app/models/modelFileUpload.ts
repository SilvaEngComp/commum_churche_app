import { TempFile } from './temFile';

export class ModelFileUplod {
  files: TempFile[];
  formData: FormData;

  constructor() {
    this.files = [];
    this.formData = new FormData();
  }
}
