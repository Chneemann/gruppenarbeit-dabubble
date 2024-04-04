import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';

@Component({
  selector: 'app-chat-msg-box',
  standalone: true,
  imports: [CommonModule, FormsModule, PickerComponent],
  templateUrl: './chat-msg-box.component.html',
  styleUrl: './chat-msg-box.component.scss',
})
export class ChatMsgBoxComponent {
  hasFile: boolean = false;
  currentFiles!: FileList ;
  files: any;
  uploadFiles: File[] = [];
  getFileIcons = [
    'assets/img/documentIcon.svg',
    'assets/img/imgIcon.svg',
    'assets/img/mp3Icon.svg',
    'assets/img/pdfIcon.svg',
    'assets/img/videoIcon.svg',
  ];
  public textArea: string = '';
  public isEmojiPickerVisible: boolean | undefined;
  showEmojis: boolean = false;


  constructor() {}


  onFileChange(event: any) {
    this.currentFiles = event.target.files;
    this.hasFile = this.currentFiles!.length > 0;

    if (this.currentFiles) {
      for (let i = 0; i < this.currentFiles.length; i++) {
        const fileInfo = this.currentFiles[i];
        this.uploadFiles.push(fileInfo);
        console.log(this.uploadFiles);
      }
    }
  }


  checkIcon(fileInfo: any) {
    if (fileInfo.type == "audio/mpeg") {
      return this.getFileIcons[2];
    } else if (fileInfo.type == "image/jpeg") {
      return this.getFileIcons[1];
    } else if (fileInfo.type == "application/pdf") {
      return this.getFileIcons[3];
    } else if (fileInfo.type == "video/mp4") {
      return this.getFileIcons[4];
    } else {
      return this.getFileIcons[0];
    }
  }


  deleteFile(file: File) {
    const index = this.uploadFiles.indexOf(file);
    if (index !== -1) {
      this.uploadFiles.splice(index, 1);
      this.hasFile = this.uploadFiles.length > 0;
    }
    console.log(this.uploadFiles); ///------------------------------------------------------------
  }
  
  
  showCurrentFile(file: File) {
    const blob = new Blob([file], { type: file.type });  // Blob (Binary Large Object) 
    const url = URL.createObjectURL(blob); // Erstelle einen Objekt-URL für den blon
    window.open(url, '_blank'); // öffne den datei in einem neuen Fenster
  }

  
  public addEmoji(event: any) {
    this.textArea = `${this.textArea}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }


  toggleShowEmojis(){
    this.showEmojis = !this.showEmojis;
    this.isEmojiPickerVisible = true; 
  }


  targetChetUser() {}

  sendMessage() {}
}
