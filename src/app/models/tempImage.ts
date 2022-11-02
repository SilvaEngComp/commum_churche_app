export class ModelImgeUplod {
  images: TempFile[];
  formData: FormData;

  constructor() {
    this.images = [];
    this.formData = new FormData();
  }
}

export class TempFile {
  id: number;
  name: string;
  path: any;
  type: string;
  extension: string;
  checked: boolean;

  constructor(
    name?: string,
    path?: any,
    type?: string,
    checked: boolean = false
  ) {
    this.name = name;
    this.path = path;

    this.checked = checked;
    if (type) {
      this.checkType(type);
    }
  }

  checkType(type: string) {
    const t: string[] = type.split('/');
    if (
      t[1] !== 'mp4' &&
      t[1] !== 'pdf' &&
      t[1] !== 'png' &&
      t[1] !== 'jpg' &&
      t[1] !== 'jpeg' &&
      t[1] !== 'webp'
    ) {
    } else {
      this.type = t[0];
      this.extension = t[1];
    }
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
