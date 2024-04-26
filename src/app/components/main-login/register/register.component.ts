import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Firestore } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { SmallBtnComponent } from '../../../shared/components/small-btn/small-btn.component';
import { FooterComponent } from '../../../shared/components/login/footer/footer.component';
import { loginService } from '../../../service/login.service';
import { StartHeaderComponent } from '../../../shared/components/login/start-header/start-header.component';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [
    FormsModule,
    CommonModule,
    SmallBtnComponent,
    FooterComponent,
    RouterLink,
    StartHeaderComponent,
  ],
})
export class RegisterComponent {
  firestore: Firestore = inject(Firestore);
  isChecked: boolean = false;
  currentImage: string;
  defaultImage = '/assets/img/login/box.png';
  clickedImage = '/assets/img/login/box-checked.png';
  hoverImage = '/assets/img/login/box-hover.png';
  clickedHoverImage = '/assets/img/login/box-checked-hover.png';

  constructor(public loginService: loginService, private router: Router) {
    this.currentImage = this.defaultImage;
  }

  onSubmit(ngForm: NgForm) {
    const names = this.loginService.name.split(' ');
    this.loginService.firstName = names[0];
    this.loginService.lastName = names.slice(1).join(' ');
    this.router.navigate(['/avatar']);
  }

  toggleCheckbox() {
    this.isChecked = !this.isChecked;
    this.updateImage();
  }

  onMouseOver() {
    this.updateImage(true);
  }

  onMouseOut() {
    this.updateImage();
  }

  updateImage(isHovering: boolean = false) {
    if (this.isChecked) {
      this.currentImage = isHovering
        ? this.clickedHoverImage
        : this.clickedImage;
    } else {
      this.currentImage = isHovering ? this.hoverImage : this.defaultImage;
    }
  }
}
