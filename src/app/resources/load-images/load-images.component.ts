/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { UiService } from 'src/app/services/ui.service';
import { LoginService } from 'src/app/services/login.service';
import { ModelImgeUplod, TempFile } from 'src/app/models/tempImage';
import { User } from 'src/app/models/User';

// import { FilePath } from "@ionic-native/file-path/ngx";
@Component({
  selector: 'app-load-images',
  templateUrl: './load-images.component.html',
  styleUrls: ['./load-images.component.scss'],
})
export class LoadImagesComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver = false;
  @Output() returnPage: EventEmitter<any> = new EventEmitter<any>();

  constructor(private exceptionService: ExceptionService) {}

  @Input() localImages: ModelImgeUplod;
  @Input() myFile: TempFile;
  user: User;
  @Input() single: boolean;
  @Input() confirmButton: boolean;

  hasOneSelected: boolean;
  selectedImge: string;
  file64: any[] = [];

  ngOnInit() {
    if (!this.localImages) {
      this.localImages = new ModelImgeUplod();
    }

    this.user = LoginService.getUser();
    this.localImages.images = [];
    this.selectedImge = null;
  }

  getFiles(): FileLikeObject[] {
    let cont = 0;
    this.localImages.images = [];

    return this.uploader.queue.map((fileItem, i) => {
      cont++;

      const url = URL.createObjectURL(fileItem._file);

      const image = new TempFile(fileItem._file.name, url, fileItem._file.type);
      this.localImages.images.push(image);
      if (this.single) {
        this.localImages.formData.append(
          'files',
          fileItem._file,
          fileItem._file.name
        );
        this.selectedImge = url;
      } else {
        this.localImages.formData.append(
          'files[]',
          fileItem._file,
          fileItem._file.name
        );
      }

      return fileItem.file;
    });
  }

  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  fileOverBase(ev): void {
    this.hasBaseDropZoneOver = ev;
  }

  onSelectImage(image: TempFile) {
    this.localImages.images.filter((img) => {
      if (img.path === image.path) {
        img.checked = !img.checked;
      }
    });

    this.hasSelected();
  }

  getLimite() {
    if (this.localImages.images.length >= 10) {
      this.exceptionService.alertDialog('Limite de 10 imagens', 'Atenção!');
      return true;
    }

    return false;
  }

  async onReceiveImage() {
    const files: any[] = this.getFiles();
    if (!this.confirmButton) {
      this.back();
    }
  }

  hasSelected() {
    this.localImages.images.filter((image) => {
      if (image.checked) {
        this.hasOneSelected = true;
      }
    });
  }

  showImgeBigger(file: TempFile) {
    file.checked = true;
    this.hasOneSelected = true;
    if (file.type !== 'mp4' && file.type !== 'pdf') {
      if (this.selectedImge === file.path) {
        return (this.selectedImge = null);
      }
      this.selectedImge = file.path;
    }
  }

  excluir() {
    if (!this.single) {
      const selectedImges: TempFile[] = this.localImages.images.filter(
        (image) => {
          if (image.checked) {
            return image;
          }
        }
      );

      selectedImges.filter((image) => {
        this.localImages.images.splice(
          this.localImages.images.indexOf(image),
          1
        );
        this.uploader.queue.splice(this.localImages.images.indexOf(image), 1);
      });
    } else {
      this.myFile = null;
      this.selectedImge = null;
    }

    this.selectedImge = '';
    this.hasOneSelected = false;
  }
  reorderFiles(reorderEvent: CustomEvent): void {
    const element = this.uploader.queue.splice(reorderEvent.detail.from, 1)[0];
    this.uploader.queue.splice(reorderEvent.detail.to, 0, element);
  }
  back() {
    this.returnPage.emit({
      files: this.localImages,
    });
  }
  cancel() {
    this.returnPage.emit();
  }
}
