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

}
