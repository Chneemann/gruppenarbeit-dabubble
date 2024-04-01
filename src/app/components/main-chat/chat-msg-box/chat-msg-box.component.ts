import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-msg-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-msg-box.component.html',
  styleUrl: './chat-msg-box.component.scss',
})
export class ChatMsgBoxComponent {
  hasFile: boolean = false;
  currentFile?: File;
  currentFiles: FileList | null = null;
  message = '';
  files: any;
  uploadFiles: File[] = [];
  getFileIcons = [
    'assets/img/documentIcon.svg',
    'assets/img/imgIcon.svg',
    'assets/img/mp3Icon.svg',
    'assets/img/pdfIcon.svg',
    'assets/img/videoIcon.svg',
  ];

  constructor() {}

  
  onFileChange(event: any) {
    this.currentFiles = event.target.files;
    this.hasFile = this.currentFiles!.length > 0;

    if (this.currentFiles) {
      // this.uploadFiles = [];
      for (let i = 0; i < this.currentFiles.length; i++) {
        const fileInfo = this.currentFiles[i];
        const iconElement = this.createIconElement(fileInfo);
        const label = document.querySelector('label[for="files"]') as HTMLElement;
        label.appendChild(iconElement);
        this.uploadFiles.push(fileInfo);
        console.log(this.uploadFiles);
        
      }
    }
  }


  createIconElement(fileInfo: File): HTMLImageElement {
    const iconUrl = this.checkIcon(fileInfo);
    const iconElement = document.createElement('img');
    iconElement.src = iconUrl;
    iconElement.classList.add('icon-style');
    return iconElement;
  }


  checkIcon(fileInfo: any) {
    if (fileInfo.type == "audio/mpeg") {
      return this.getFileIcons[2];
    } else if (fileInfo.type == "image/jpeg") {
      return this.getFileIcons[1];
    } else if (fileInfo.type == "application/pdf") {
      return this.getFileIcons[3];
    } else if (fileInfo.type == "video/mp4") {
      return this.getFileIcons[5];
    } else {
      return this.getFileIcons[0];
    }
  }

  uploadData() {}

  addSmaili() {}

  targetChetUser() {}

  sendMessage() {}
}
