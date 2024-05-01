import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import {
  Chat,
  ChatAnswers,
  ChatReactions,
} from '../../../../interface/chat.interface';
import { SingleChatComponent } from '../single-chat.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ChatService } from '../../../../service/chat.service';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { SmallBtnComponent } from '../../../../shared/components/small-btn/small-btn.component';
import { DownloadFilesService } from '../../../../service/download-files.service';
import { EmojiPickerComponent } from '../../../../shared/components/emoji-picker/emoji-picker.component';
import { UserService } from '../../../../service/user.service';

@Component({
  selector: 'app-edit-msg',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SingleChatComponent,
    PickerComponent,
    SmallBtnComponent,
    EmojiPickerComponent,
  ],
  templateUrl: './edit-msg.component.html',
  styleUrl: './edit-msg.component.scss',
})
export class EditMsgComponent {
  @Input() chat!: Chat | ChatAnswers;
  @Output() closeEditMsgEmitter: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  isEmojiPickerVisible: boolean | undefined;
  public originalMessage: string = '';

  constructor(
    public chatService: ChatService,
    public downloadFilesService: DownloadFilesService,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.originalMessage = this.chat.message as string;
  }

  closeEditMsg() {
    this.chat.message = this.originalMessage;
    this.closeEditMsgEmitter.emit(false);
  }

  onSubmit(chatId: string, form: NgForm) {
    this.chatService.updateChat(chatId, form.value);
    this.closeEditMsg();
  }

  // EMOJI

  emojiOutputEmitter($event: any) {
    this.addEmoji($event);
  }

  public addEmoji(event: any) {
    this.chat.message = `${this.chat.message}${event}`;
    this.isEmojiPickerVisible = false;
  }

  toggleEmojiPicker() {
    this.isEmojiPickerVisible = !this.isEmojiPickerVisible;
  }

  // FILES

  showCurrentFile(filePath: string) {
    const url = filePath;
    window.open(url, '_blank');
  }

  getFileType(filePath: string): string {
    const fileName = filePath.split('?')[0].split('/').pop();

    if (fileName) {
      if (fileName.endsWith('.mp3')) {
        return 'assets/img/mp3Icon.svg';
      } else if (fileName.endsWith('.jpg' || '.jpeg' || '.png' || '.gif')) {
        return 'assets/img/imgIcon.svg';
      } else if (fileName.endsWith('.pdf' || '.doc' || '.txt')) {
        return 'assets/img/pdfIcon.svg';
      } else if (fileName.endsWith('.mp4' || '.avi')) {
        return 'assets/img/videoIcon.svg';
      }
    }
    return 'assets/img/documentIcon.svg';
  }

  deleteFile(file: string) {
    console.log('Deleted:' + file);
  }
}
