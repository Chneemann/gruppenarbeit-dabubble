import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { OverlayService } from '../../../service/overlay.service';
import { CommonModule } from '@angular/common';
import { SmallBtnComponent } from '../small-btn/small-btn.component';

@Component({
  selector: 'app-overlay',
  standalone: true,
  imports: [CommonModule, SmallBtnComponent],
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.scss',
})
export class OverlayComponent implements OnInit {
  overlayData: any;

  constructor(private overlayService: OverlayService) {}

  ngOnInit(): void {
    this.overlayService.overlayData$.subscribe((data) => {
      this.overlayData = data;
    });
  }

  getFileType(file: string): string {
    const extension = file.split('.').pop()?.toLowerCase();
    const getTag = extension!.split('?')[0];
    return getTag || '';
  }

  onCloseOverlay() {
    this.overlayData = '';
  }

  @HostListener('document:click', ['$event'])
  checkOpenContactEdit(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (
      !targetElement.closest('.overlayContent') &&
      !targetElement.closest('.attachments')
    ) {
      this.onCloseOverlay();
    }
  }
}
