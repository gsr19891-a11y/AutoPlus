import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { HttpService } from '../../services/http-service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';
import { LangService } from '../../services/lang-service';
import { TranslatePipe } from '../../pipes/translate-pipe';


@Component({
  selector: 'app-header',
  imports: [RouterLink, DragDropModule, RouterLinkActive,TranslatePipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {


  messageToggle = signal(false);
  messageCount = signal(0);

  langService = inject(LangService);



isContOpen = signal(false);
toggleCont() {
  this.isContOpen.set(!this.isContOpen());
}



buregerToggle = signal(false);

toggleBurger() {
  this.buregerToggle.set(!this.buregerToggle());
}
 

 changeLang(event: Event) {
    const lang = (event.target as HTMLSelectElement).value as 'en' | 'ka';
    this.langService.setLanguage(lang);
  }


}
