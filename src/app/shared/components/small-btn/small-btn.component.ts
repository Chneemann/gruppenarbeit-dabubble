import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-small-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './small-btn.component.html',
  styleUrl: './small-btn.component.scss',
})
export class SmallBtnComponent {
  @Input() imgSrc: string = '';
  @Input() imgSize: string = '14px';
  @Input() btnSize: string = '28px';
  @Input() btnBgHoverColor: string = '#edeefe';
}
