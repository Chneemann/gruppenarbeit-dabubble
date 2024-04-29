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


  /**
 * Initializes the component and decides whether to start animations based on the login service state.
 */
  ngOnInit(): void {
    if (!this.loginService.getAnimationState()) {
      this.triggerAnimations();
    } else {
      this.d_none = true;
    }
  }


  /**
 * Triggers a sequence of animations with nested timeouts to manage their execution order and timing.
 */
  triggerAnimations(): void {
    setTimeout(() => {
      this.animationStart = true; 
      setTimeout(() => {
        this.animationLogo = true; 
        setTimeout(() => {
          setTimeout(() => {
            this.animationBackground = true;
          }, 1000);
          this.animationToEndPosiotion = true;
          this.loginService.setAnimationState(true); 
          setTimeout(() => {
            this.d_none = true;
            this.loginService.setFinalClass(true);
            this.animationsBlock = true;
          }, 2000);
        }, 2000); 
      }, 300); 
    }, 1000); 
  }
}
