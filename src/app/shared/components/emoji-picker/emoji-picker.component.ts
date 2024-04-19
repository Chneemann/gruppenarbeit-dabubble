import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';

@Component({
  selector: 'app-emoji-picker',
  standalone: true,
  imports: [PickerComponent],
  templateUrl: './emoji-picker.component.html',
  styleUrl: './emoji-picker.component.scss',
})
export class EmojiPickerComponent {
  @Input() output: string = '';
  @Output() emojiOutputEmitter: EventEmitter<void> = new EventEmitter<void>();

  addEmoji(event: any) {
    this.output == 'id' ? this.emojiOutputEmitter.emit(event.emoji.id) : null;
    this.output == 'native'
      ? this.emojiOutputEmitter.emit(event.emoji.native)
      : null;
  }
}
