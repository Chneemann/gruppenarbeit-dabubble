import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { ChatService } from '../../../service/chat.service';
import { ChannleService } from '../../../service/channle.service';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { getStorage, ref, uploadBytes } from '@angular/fire/storage';


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
  currentChetValue: string = '';
  @Input() currentChannel: string = '';
  base64String: any = '';
  currentChangedFile: any = [];
  currentAnswer: any;
  test:any;


  constructor(
    private ChatService: ChatService,
    private ChannleService: ChannleService,
    private firestore: Firestore
  ) {}

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
    const index = this.uploadFiles.indexOf(file);
    if (index !== -1) {
      this.uploadFiles.splice(index, 1);
      this.hasFile = this.uploadFiles.length > 0;
    }
    console.log(this.uploadFiles); ///------------------------------------------------------------
  }

  showCurrentFile(file: File) {
    const blob = new Blob([file], { type: file.type }); // Blob (Binary Large Object)
    const url = URL.createObjectURL(blob); // Erstelle einen Objekt-URL für den blon
    window.open(url, '_blank');
  }

  public addEmoji(event: any) {
    this.textArea = `${this.textArea}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }

  toggleShowEmojis() {
    this.showEmojis = !this.showEmojis;
    this.isEmojiPickerVisible = true;
  }

  targetChetUser() {}

  async sendMessage() {
    this.fileUploaded();
    if (this.currentChannel) {
      console.log(this.currentChannel);
      const messageRef = collection(this.firestore, 'chats');
      const docRef = await addDoc(messageRef, {
        channelId: this.currentChannel,
        message: this.currentChetValue,
        publishedTimestamp: Math.floor(Date.now() / 1000),
        // attachments: this.currentChangedFile || [],
        // attachments: [{ data: 'base64String', type: 'file/type' }] || [],
        // attachments: [this.loadAllFiles()] || null,
        // attachments: this.uploadFiles.length === 0 ? [] : [await this.loadAllFiles()],
        attachments: this.uploadFiles.length === 0 ? [await this.loadAllFiles()] : [],
        // attachments: this.currentChangedFile.length === 0 ? [] : this.currentChangedFile.map((file: { data: any; type: any; }) => ({ data: file.data, type: file.type })),
        userId: 'vW6U4ckmoaHEXvhTRlmq',
      });

      // this.currentAnswer = docRef;
      // this.test = this.currentAnswer.data();
      // console.log('test', this.test);
      

      console.log('this.currentAnswer',this.currentAnswer);
      
      // this.loadAllFiles();
    } else {
      console.error(this.currentChannel, 'this.currentChannel ist leer');
    }
    this.currentChetValue = '';
    this.uploadFiles = [];
    this.hasFile = false;
  }


  fileUploaded() { // wandelt die files in strings um
    this.currentChangedFile = []; 
    for (const file of this.uploadFiles) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const base64String = event.target.result as string;
        const attachment = {
          data: base64String.split(',')[1],
          type: file.type,
        };
        this.currentChangedFile.push(attachment);
      };
      reader.readAsDataURL(file);
    }
    console.log('current stringified files', this.currentChangedFile);
  }
  


  // loadAllFiles() {
  //   if (this.currentChangedFile.length === 0) {
  //     return []; // Leeres Array zurückgeben, wenn keine Dateien vorhanden sind
  //   }
  
  //   for (let i = 0; i < this.currentChangedFile.length; i++) {
  //     const fileData = this.currentChangedFile[i].data;
  //     const fileType = this.currentChangedFile[i].type;
  //     return { data: fileData, type: fileType }; 
  //   }
  // }


  loadAllFiles() { // lädt die fails in den firebase storage
    const storage = getStorage();
    for (const file of this.uploadFiles) {
      const storageRef = ref(storage, `${this.currentChannel}/chatFiles/${file.name}`);
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot);
      });
      // return storageRef;
    }
  }
  
}
