export class TempFile {
  id: number;
  name: string;
  path: any;
  type: string;
  extension: string;
  checked: boolean;
  isValid: boolean;
  file: File;

  constructor(
    file,
    name?: string,
    path?: any,
    type?: string,
    checked: boolean = false
  ) {
    this.file = file;
    this.name = name;
    this.path = path;

    this.checked = checked;
    if (type) {
      const typePart: string[] = type.split('/');
      this.type = typePart[0];
      this.extension = typePart[1];
    }
  }

  checkExpectedType(expectedType: string[]) {
    expectedType.filter((type) => {
      if (type === this?.extension) {
        this.isValid = true;
      }
    });
  }

  setTempImage(fileItem: File, name?: string, checked: boolean = false) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.path = event.target.result;
      console.log(this.path);
    };
    reader.readAsDataURL(fileItem);

    this.name = name;

    this.checked = checked;
  }
}
