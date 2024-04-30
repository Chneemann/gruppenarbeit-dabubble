import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { DownloadFilesService } from '../../../service/download-files.service';
import { UserService } from '../../../service/user.service';
import { EmojiPickerComponent } from '../../../shared/components/emoji-picker/emoji-picker.component';
import { SmallBtnComponent } from '../../../shared/components/small-btn/small-btn.component';
import { ChatService } from '../../../service/chat.service';
import { Router } from '@angular/router';
import { ChannleService } from '../../../service/channle.service';
import { ToggleBooleanService } from '../../../service/toggle-boolean.service';
import { User } from '../../../interface/user.interface';

@Component({
  selector: 'app-chat-msg-box',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PickerComponent,
    EmojiPickerComponent,
    SmallBtnComponent,
  ],
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
  isEmojiPickerVisible: boolean | undefined;
  currentChetValue: string = '';
  @Input() currentChannel: string = '';
  showTargetMember: boolean = true; 



  constructor(
    private route: Router,
    public downloadFilesService: DownloadFilesService,
    private firestore: Firestore,
    public userService: UserService,
    private chatService: ChatService,
    public channelService: ChannleService,
    public toggleBoolean: ToggleBooleanService
  ) {}


  emojiOutputEmitter($event: any) {
    this.addEmoji($event);
  }


  onFileChange(event: any) {
    console.log('this.downloadFilesService.uploadFiles.length', this.downloadFilesService.uploadFiles.length);
    if (this.downloadFilesService.uploadFiles.length <= 5) {
      this.currentFiles = event.target.files;
      this.hasFile = this.currentFiles!.length > 0;
      if (this.currentFiles) {
        for (let i = 0; i < this.currentFiles.length; i++) {
          const fileInfo = this.currentFiles[i];
          this.downloadFilesService.uploadFiles.push(fileInfo);
        }
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
  }


  showCurrentFile(file: File) {
    const blob = new Blob([file], { type: file.type });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  }

  public addEmoji(event: any) {
    this.textArea = `${this.textArea}${event}`;
    this.isEmojiPickerVisible = false;
  }


  toggleEmojiPicker() {
    this.isEmojiPickerVisible = !this.isEmojiPickerVisible;
  }


  targetChatUser(event : Event) {
    event.stopPropagation();
    this.toggleBoolean.selectUserInMsgBox = true; 
  }


  chooseUser(user: User){
    const userName = ` @${user.firstName} ${user.lastName} `;

    this.textArea += userName;
    this.toggleBoolean.selectUserInMsgBox = false;
  }


  async sendMessage() {
    if (this.currentChannel) {
      const messageRef = collection(this.firestore, 'chats');
      await addDoc(messageRef, {
        channelId: this.checkChannelId(),
        message: this.currentChetValue,
        publishedTimestamp: Math.floor(Date.now() / 1000),
        userId: this.userService.userId,
      }).then((docID) => {
        this.downloadFilesService.loadAllFiles(docID.id);
      });
    } else {
      console.error(this.currentChannel, 'this.currentChannel ist leer');
    }
    this.forwardToChannel();
    this.resetValues();
  }


  checkChannelId(){
    if (this.chatService.getChannelId) {
      return this.chatService.getChannelId;
    } else if (this.chatService.getPrvChatId){
      return this.chatService.getPrvChatId;
    }
    return this.currentChannel;
  }


  forwardToChannel(){
    if (this.chatService.getChannelId || this.chatService.getPrvChatId) {
      this.route.navigateByUrl(`/main/${this.checkChannelId()}`);
    }
  }


  filterPublicChannel(){
    const publicChannel = this.channelService.allChannels.some(chat => chat.id === this.currentChannel);
    if(publicChannel){
      return this.showTargetMember = true;
    } else {
      return this.showTargetMember = false;
    }
  }


  resetValues(){
    this.currentChetValue = '';
    this.downloadFilesService.uploadFiles = [];
    this.hasFile = false;
    this.chatService.inputValue = '';
    this.chatService.getChannelId = '';
    this.chatService.getPrvChatId = '';
  }
}
