import { Injectable, Input } from '@angular/core';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class DownloadFilesService {
  uploadFiles: File[] = [];
  downloadedFile: any = [];
  constructor() {}


  loadAllFiles(docID: string) {
    // lädt die fails in den firebase storage
    const storage = getStorage();
    for (const file of this.uploadFiles) {
      const storageRef = ref(storage, `chatFiles/${docID}/${file.name}`);
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot);
      });
    }
  }

  downloadAllFiles(docID: string) {
    const storage = getStorage();
    getDownloadURL(ref(storage, `chatFiles/${docID}/`))
    .then((file) => {
      // const test = { id: docID};
      // this.downloadedFile.push(test: {file});  // das bild aktualisieren
      // const downloadedFilesMap = new Map();
      // downloadedFilesMap.set(docID, [file]);
      let allFiles = file;
      // this.downloadedFile = downloadedFilesMap;
      // this.filterChetID(docID);
      console.log('file url hier', this.downloadedFile);
      return allFiles;
    })
    .catch((error) =>
      console.error('Fehler beim Abrufen der Download-URL:', error));
      return '';
  }
}
