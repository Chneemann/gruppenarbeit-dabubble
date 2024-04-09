import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChannleService } from '../../../../service/channle.service';

@Component({
  selector: 'app-add-new-channel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-new-channel.component.html',
  styleUrl: './add-new-channel.component.scss'
})
export class AddNewChannelComponent {

  constructor(public channelServide: ChannleService){}


  toggleShowAddChannelBox(){
    console.log('---------------');
    
    this.channelServide.showAddChannelBox = !this.channelServide.showAddChannelBox;
  }
}
