import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from "../login/header/header.component";
import { SmallBtnComponent } from "../small-btn/small-btn.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-privacy-policy',
    standalone: true,
    templateUrl: './privacy-policy.component.html',
    styleUrl: './privacy-policy.component.scss',
    imports: [TranslateModule, HeaderComponent, SmallBtnComponent, RouterLink]
})
export class PrivacyPolicyComponent {
  constructor(private location: Location) {}

  backClicked() {
    this.location.back();
  }
}
