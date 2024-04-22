import { Component } from '@angular/core';
import { ToggleBooleanService } from '../../../service/toggle-boolean.service';
import { CommonModule } from '@angular/common';
import { SmallBtnComponent } from '../../../shared/components/small-btn/small-btn.component';

@Component({
  selector: 'app-show-channel-member',
  standalone: true,
  imports: [CommonModule, SmallBtnComponent],
  templateUrl: './show-channel-member.component.html',
  styleUrl: './show-channel-member.component.scss'
})
export class ShowChannelMemberComponent {

  constructor(public toogleBooleans: ToggleBooleanService){}

  closeChannelMemberWindow(){
    this.toogleBooleans.openChannelMemberWindow = false;
  }
}
