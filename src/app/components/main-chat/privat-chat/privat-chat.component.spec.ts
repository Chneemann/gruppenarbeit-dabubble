import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatChatComponent } from './privat-chat.component';

describe('PrivatChatComponent', () => {
  let component: PrivatChatComponent;
  let fixture: ComponentFixture<PrivatChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivatChatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrivatChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
