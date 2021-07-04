import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css'],
})
export class ImageUploaderComponent {
  @Output() sendPhoto = new EventEmitter<File>();
  @Input() photoForm = FormGroup;

  constructor(private fb: FormBuilder) {}

  name = 'Angular';
  imageChangedEvent: any = '';
  croppedImage: any = '';
  imageFile!: File;

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.file;
    this.convertToFilePhoto();
    this.sendPhoto.emit(this.imageFile);
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  convertToFilePhoto() {
    this.imageFile = new File([this.croppedImage], 'photo.png', {
      type: 'image/png',
    });
  }
}
