import { Injectable, Input } from '@angular/core';
import { getDownloadURL, getStorage, ref, uploadBytes } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class DownloadFilesService {
  @Input() uploadFiles: File[] = [];
  @Input() currentChannel: string = '';
  downloadedFile: any = [];
  constructor() { }


  loadAllFiles() { // lädt die fails in den firebase storage
    const storage = getStorage();
    for (const file of this.uploadFiles) {
      const storageRef = ref(storage, `${this.currentChannel}/chatFiles/${file.name}`);
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot);
        getDownloadURL(ref(storage, `${this.currentChannel}/chatFiles/${file.name}`))
          .then((file) => {
            this.downloadedFile.push(file);  // das bild aktualisieren  
            console.log('file url hier', this.downloadedFile);
          }).catch((error) => console.error('Fehler beim Abrufen der Download-URL:', error));
      });
    }
  }
}
