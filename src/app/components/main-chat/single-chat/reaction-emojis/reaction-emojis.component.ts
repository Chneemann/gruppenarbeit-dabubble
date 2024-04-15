import { Component } from '@angular/core';
import { SmallBtnComponent } from '../../../../shared/components/small-btn/small-btn.component';

@Component({
  selector: 'app-reaction-emojis',
  standalone: true,
  imports: [SmallBtnComponent],
  templateUrl: './reaction-emojis.component.html',
  styleUrl: './reaction-emojis.component.scss',
})
export class ReactionEmojisComponent {}
