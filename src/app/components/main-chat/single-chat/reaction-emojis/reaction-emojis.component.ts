import { Component } from '@angular/core';
import { SmallBtnComponent } from '../../../../shared/components/small-btn/small-btn.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reaction-emojis',
  standalone: true,
  imports: [CommonModule, SmallBtnComponent],
  templateUrl: './reaction-emojis.component.html',
  styleUrl: './reaction-emojis.component.scss',
})
export class ReactionEmojisComponent {
  isDialogOpen: boolean = false;

  toggleDialog() {
    this.isDialogOpen = !this.isDialogOpen;
  }
}
