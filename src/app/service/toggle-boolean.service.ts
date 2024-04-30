import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToggleBooleanService {

  constructor() { }

  openSearchWindow: boolean = false;
  openChannelMemberWindow: boolean = false;
  closeChannelMemberWindow: boolean = false;
  openSearchWindowHead: boolean = false;
  selectUserInMsgBox:boolean = false;


  openAddMemberWindow(boolean : boolean){
    this.closeChannelMemberWindow = boolean;
  }
}
