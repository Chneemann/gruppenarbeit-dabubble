import { Component, inject } from '@angular/core';

import { FooterComponent } from '../../../shared/components/login/footer/footer.component';
import { RouterModule } from '@angular/router';
import { SmallBtnComponent } from '../../../shared/components/small-btn/small-btn.component';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Firestore } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { loginService } from '../../../service/login.service';
import { RouterLink, Router } from '@angular/router';
import { StartHeaderComponent } from '../../../shared/components/login/start-header/start-header.component';

@Component({
  selector: 'app-choose-avatar',
  standalone: true,
  templateUrl: './choose-avatar.component.html',
  styleUrl: './choose-avatar.component.scss',
  imports: [
    StartHeaderComponent,
    FooterComponent,
    RouterModule,
    SmallBtnComponent,
    CommonModule,
  ],
})
export class ChooseAvatarComponent {
  avatarSrc: string = '/assets/img/user-icons/guest.svg';
  firestore: Firestore = inject(Firestore);
  selectedFile: File | null = null;
  avatarImages: string[] = [
    '/assets/img/user-icons/female-1.svg',
    '/assets/img/user-icons/female-2.svg',
    '/assets/img/user-icons/male-1.svg',
    '/assets/img/user-icons/male-2.svg',
    '/assets/img/user-icons/male-3.svg',
    '/assets/img/user-icons/male-4.svg',
  ];

  constructor(public loginService: loginService, private router: Router) {}

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.selectedFile = file;

      // FileReader um die Datei zu lesen
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarSrc = e.target.result; // Das gelesene Bild als Avatar setzen
      };
      reader.readAsDataURL(file); // Lesen der Datei als Data URL
      this.uploadFile(file);
    }
  }

  uploadFile(file: any) {
    const storage = getStorage();
    const storageRef = ref(storage, 'avatars/' + file.name);
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log('Datei hochgeladen!', snapshot);
        getDownloadURL(ref(storage, 'avatars/' + file.name))
          .then((url) => {
            this.avatarSrc = url; // das bild aktualisieren
            console.log('bild url hier', url);
            this.loginService.getAvatarUrl(url);
          })

          .catch((error) =>
            console.error('Fehler beim Abrufen der Download-URL:', error)
          );
      })
      .catch((error) => {
        console.error('Fehler beim Hochladen:', error);
      });
  }

  // uploadSelectedFile() {
  //   if (this.selectedFile) {
  //     this.uploadFile(this.selectedFile);
  //   }
  // }

  chooseExistAvatar(index: number) {
    this.avatarSrc = this.avatarImages[index];
    this.loginService.getAvatarUrl(this.avatarSrc);
    this.read();
  }
  read() {
    console.log('das ist drin', this.avatarSrc);
  }
}
