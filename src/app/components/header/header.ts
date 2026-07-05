import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { HttpService } from '../../services/http-service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';


@Component({
  selector: 'app-header',
  imports: [RouterLink, DragDropModule, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  public authService = inject(AuthService);

  phoneNumber = this.authService.userPhoneNumber;

  messageToggle = signal(false);
  messageCount = signal(0);

  constructor(
    private httpService: HttpService,
    private router: Router

  ) {
    this.phoneNumber.set(localStorage.getItem('phoneNumber'));
  }


isContOpen = signal(false);
toggleCont() {
  this.isContOpen.set(!this.isContOpen());
}



buregerToggle = signal(false);

toggleBurger() {
  this.buregerToggle.set(!this.buregerToggle());
}
 



}
