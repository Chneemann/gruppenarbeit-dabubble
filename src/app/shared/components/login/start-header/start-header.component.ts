import { Component, EventEmitter, Input } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { loginService } from '../../../../service/login.service';

@Component({
  selector: 'app-start-header',
  standalone: true,
  imports: [CommonModule, RouterLink, NgStyle],
  templateUrl: './start-header.component.html',
  styleUrl: './start-header.component.scss',
})
export class StartHeaderComponent {
  @Input() introCompleteStatus: boolean = false;
  @Input() display: string = '';
  animationStart: boolean = false;
  animationLogo: boolean = false;
  d_none: boolean = false;
  animationBackground: boolean = false;
  animationToEndPosiotion: boolean = false;
  animationsBlock: boolean = false;

  constructor(public loginService: loginService) {}

  ngOnInit(): void {
    if (!this.loginService.getAnimationState()) {
      this.triggerAnimations();
    } else {
      this.d_none = true; // Setzen Sie d-none, wenn die Animation bereits abgespielt wurde
     
    }
  }

  triggerAnimations(): void {
    setTimeout(() => {
      this.animationStart = true; // erste dass hioer
      setTimeout(() => {
        this.animationLogo = true; // dann das hier nochmal drauf

        setTimeout(() => {
          setTimeout(() => {
            setTimeout(() => {
              this.d_none = true;
            }, 500);
            this.animationBackground = true;
          }, 1000);
          this.animationToEndPosiotion = true;
           this.loginService.setAnimationState(true); //  Animation  abgespielt true
          setTimeout(() => {
            
             this.loginService.setFinalClass(true)
              this.animationsBlock=true
          }, 3300);
        }, 2000); // hinterguner
      }, 300); // dan nach der zeit dass usw aktuell schrift
    }, 1000); // also das fängt an
  }
}
