import { Injectable, Input } from '@angular/core';
import {
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class DownloadFilesService {
  uploadFiles: File[] = [];
  downloadedFile: any = [];
  constructor() {
    console.log(this.displayAllFiles('q9Ptk7r7DjFdn2Nf0o94'));
  }

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

  displayAllFiles(docID: string) {
    const storage = getStorage();
    const listRef = ref(storage, 'chatFiles/' + docID);
    listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          return this.downloadFile(itemRef.name, docID);
        });
      })
      .catch((error) => {
        console.error('Fehler beim Abrufen der Download-URL:', error);
      });
  }

  downloadFile(file: string, docID: string) {
    const storage = getStorage();
    getDownloadURL(ref(storage, 'chatFiles/' + docID + '/' + file))
      .then((url) => {
        console.log(url);
      })
      .catch((error) => {
        console.error('Fehler beim Abrufen der Download-URL:', error);
      });
  }
}
