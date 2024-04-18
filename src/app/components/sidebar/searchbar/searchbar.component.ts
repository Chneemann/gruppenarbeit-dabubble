import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent {
  @Input() openSchearchWindow!: boolean;
  @Output() toogleSpenSchearchWindow: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(){}

  closeSearchWindow(){
    this.toogleSpenSchearchWindow.emit(false);
  }
}
