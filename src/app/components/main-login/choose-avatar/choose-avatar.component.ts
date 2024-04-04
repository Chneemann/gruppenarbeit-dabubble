import { Component } from '@angular/core';
import { HeaderComponent } from "../../../shared/components/login/header/header.component";
import { FooterComponent } from "../../../shared/components/login/footer/footer.component";
import { RouterModule } from '@angular/router';
import { SmallBtnComponent } from "../../../shared/components/small-btn/small-btn.component";

@Component({
    selector: 'app-choose-avatar',
    standalone: true,
    templateUrl: './choose-avatar.component.html',
    styleUrl: './choose-avatar.component.scss',
    imports: [HeaderComponent, FooterComponent, RouterModule, SmallBtnComponent]
})
export class ChooseAvatarComponent {

    avatarSrc: string = '/assets/img/charater1.svg';
   
    



    onFileChange(event: any) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
      
            // filereader um die Datei zu lesen
            const reader = new FileReader();
            reader.onload = (e: any) => {
              this.avatarSrc = e.target.result; //das gelesene als bild bez avatar
            };
            reader.readAsDataURL(file); // lesen die datei als  URL
          }
        }
      

      showCurrentFile(file: File) {
        const blob = new Blob([file], { type: file.type });  // Blob (Binary Large Object) 
        const url = URL.createObjectURL(blob); // Erstelle einen Objekt-URL für den blon
        window.open(url, '_blank'); // öffne den datei in einem neuen Fenster
      }
}
