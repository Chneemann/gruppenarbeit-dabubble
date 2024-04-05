import { Component,inject } from '@angular/core';
import { HeaderComponent } from "../../../shared/components/login/header/header.component";
import { FooterComponent } from "../../../shared/components/login/footer/footer.component";
import { RouterModule } from '@angular/router';
import { SmallBtnComponent } from "../../../shared/components/small-btn/small-btn.component";
import { getStorage, ref, uploadBytes, getDownloadURL   } from "firebase/storage";
import { Firestore } from '@angular/fire/firestore';
@Component({
    selector: 'app-choose-avatar',
    standalone: true,
    templateUrl: './choose-avatar.component.html',
    styleUrl: './choose-avatar.component.scss',
    imports: [HeaderComponent, FooterComponent, RouterModule, SmallBtnComponent]
})

export class ChooseAvatarComponent {
    avatarSrc: string = '/assets/img/charater1.svg';
    firestore: Firestore = inject(Firestore);
    constructor() {
    }

    onFileChange(event: any) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
      
            // FileReader um die Datei zu lesen
            const reader = new FileReader();
            reader.onload = (e: any) => {
              this.avatarSrc = e.target.result; // Das gelesene Bild als Avatar setzen
            };
            reader.readAsDataURL(file); // Lesen der Datei als Data URL

            // Optional: Hochladen der Datei in Firebase Storage
            this.uploadFile(file);
        }
    }

    uploadFile(file: File) {
        const storage = getStorage();
        const storageRef = ref(storage, 'avatars/' + file.name);
        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Datei hochgeladen!', snapshot);
            getDownloadURL(ref(storage, 'avatars/' + file.name))
             .then((url) => {
                this.avatarSrc = url;  // das bild aktualisieren  
                console.log('bild url hier', url);
              })
              
            .catch((error) => console.error('Fehler beim Abrufen der Download-URL:', error));
        })
        .catch((error) => {
          console.error('Fehler beim Hochladen:', error);
        });
      }

    showCurrentFile(file: File) {
        const blob = new Blob([file], { type: file.type }); 
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank'); // Öffnen der Datei in einem neuen Fenster
    }
}