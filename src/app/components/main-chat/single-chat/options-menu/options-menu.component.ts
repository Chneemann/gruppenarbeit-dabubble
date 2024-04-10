import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SingleChatComponent } from '../single-chat.component';

@Component({
  selector: 'app-options-menu',
  standalone: true,
  imports: [CommonModule, SingleChatComponent],
  templateUrl: './options-menu.component.html',
  styleUrl: './options-menu.component.scss',
})
export class OptionsMenuComponent {
  @Input() index: number = 0;
}
