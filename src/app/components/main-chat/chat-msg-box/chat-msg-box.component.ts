import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { DownloadFilesService } from '../../../service/download-files.service';


@Component({
  selector: 'app-chat-msg-box',
  standalone: true,
  imports: [CommonModule, FormsModule, PickerComponent],
  templateUrl: './chat-msg-box.component.html',
  styleUrl: './chat-msg-box.component.scss',
})
export class ChatMsgBoxComponent {
  hasFile: boolean = false;
  currentFiles!: FileList;
  files: any;
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
  currentChetValue: string = '';
  @Input() currentChannel: string = '';
  base64String: any = '';
  currentChangedFile: any = [];
  currentAnswer: any;
  test:any;


  constructor(
    public downloadFilesService: DownloadFilesService,
    private firestore: Firestore
  ) {}

  onFileChange(event: any) {
    this.currentFiles = event.target.files;
    this.hasFile = this.currentFiles!.length > 0;
    if (this.currentFiles) {
      for (let i = 0; i < this.currentFiles.length; i++) {
        const fileInfo = this.currentFiles[i];
        this.downloadFilesService.uploadFiles.push(fileInfo);
        console.log(this.downloadFilesService.uploadFiles);
      }
    }
  }


  checkIcon(fileInfo: any) {
    if (fileInfo.type == 'audio/mpeg') {
      return this.getFileIcons[2];
    } else if (fileInfo.type == 'image/jpeg') {
      return this.getFileIcons[1];
    } else if (fileInfo.type == 'application/pdf') {
      return this.getFileIcons[3];
    } else if (fileInfo.type == 'video/mp4') {
      return this.getFileIcons[4];
    } else {
      return this.getFileIcons[0];
    }
  }


  deleteFile(file: File) {
    const index = this.downloadFilesService.uploadFiles.indexOf(file);
    if (index !== -1) {
      this.downloadFilesService.uploadFiles.splice(index, 1);
      this.hasFile = this.downloadFilesService.uploadFiles.length > 0;
    }
    console.log(this.downloadFilesService.uploadFiles); ///------------------------------------------------------------
  }


  showCurrentFile(file: File) {
    const blob = new Blob([file], { type: file.type });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  }


  public addEmoji(event: any) {
    this.textArea = `${this.textArea}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }


  changeShowEmojisValue() {
    // this.showEmojis = !this.showEmojis;
    this.isEmojiPickerVisible = true;
  }



  targetChetUser(){}


  async sendMessage() {
    if (this.currentChannel) {
      console.log(this.currentChannel);
      const messageRef = collection(this.firestore, 'chats');
      await addDoc(messageRef, {
        channelId: this.currentChannel,
        message: this.currentChetValue,
        publishedTimestamp: Math.floor(Date.now() / 1000),
        userId: 'vW6U4ckmoaHEXvhTRlmq',
      }).then((docID) => {
        this.downloadFilesService.loadAllFiles(docID.id);
        console.log('docID.id', docID.id);
      });
    } else {
      console.error(this.currentChannel, 'this.currentChannel ist leer');
    }
    this.currentChetValue = '';
    this.downloadFilesService.uploadFiles = [];
    this.hasFile = false;
  }



}
