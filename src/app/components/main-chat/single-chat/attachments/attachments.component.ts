import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DownloadFilesService } from '../../../../service/download-files.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-attachments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attachments.component.html',
  styleUrl: './attachments.component.scss',
})
export class AttachmentsComponent {
  @Input() chatId!: string;

  downloadedFiles: string[] = [];

  constructor(
    public downloadFilesService: DownloadFilesService,
    public sanitizer: DomSanitizer
  ) {}

  getFileType(file: string): string {
    const extension = file.split('.').pop()?.toLowerCase();
    const getTag = extension!.split('?')[0];
    if (getTag) {
      return getTag;
    }
    return '';
  }

  getSafeFileUrl(file: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(file);
  }
}
