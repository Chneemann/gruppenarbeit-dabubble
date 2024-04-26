import { Component, ElementRef, Renderer2 } from '@angular/core';
import { loginService } from '../../../service/login.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../../shared/components/login/footer/footer.component';
import { CommonModule } from '@angular/common';
import { StartHeaderComponent } from '../../../shared/components/login/start-header/start-header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    FormsModule,
    CommonModule,
    FooterComponent,
    RouterLink,
    StartHeaderComponent,
  ],
})
export class LoginComponent {
  constructor(
    public loginService: loginService,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      const element = this.elRef.nativeElement.querySelector(
        '.startIntroScrollProtect'
      );
      if (element) {
        this.renderer.removeClass(element, 'startIntroScrollProtect');
      }
    }, 4500);
  }
  onSubmit() {
    this.loginService.login();
  }
}
