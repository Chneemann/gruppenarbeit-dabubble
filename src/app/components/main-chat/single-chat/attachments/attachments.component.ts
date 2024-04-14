import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DownloadFilesService } from '../../../../service/download-files.service';
import { OverlayService } from '../../../../service/overlay.service';
import { OverlayComponent } from '../../../../shared/components/overlay/overlay.component';

@Component({
  selector: 'app-attachments',
  standalone: true,
  imports: [CommonModule, OverlayComponent],
  templateUrl: './attachments.component.html',
  styleUrl: './attachments.component.scss',
})
export class AttachmentsComponent {
  @Input() chatId: string = '';
  @Input() openOnSecondaryChat: boolean = false;
  imageUrl: string = '';

  constructor(
    public downloadFilesService: DownloadFilesService,
    private overlayService: OverlayService
  ) {}

  // Type of files:
  // Img: PNG, GIF, JPG, JPEG
  // Files: PDF, DOC, TXT
  // Audio: MP3, WMA, WAV
  // Video: MP4

  getFileType(file: string): string {
    const extension = file.split('.').pop()?.toLowerCase();
    const getTag = extension!.split('?')[0];
    return getTag || '';
  }

  showOverlay(file: string) {
    this.overlayService.setOverlayData(file);
  }
}
