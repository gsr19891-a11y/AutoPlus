import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { register } from 'swiper/element/bundle';
import { TranslatePipe } from '../../pipes/translate-pipe';
import { LangService } from '../../services/lang-service';


register();

@Component({
  selector: 'app-tech',
  imports: [TranslatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './tech.html',
  styleUrl: './tech.scss',
  standalone: true
})
export class Tech {

  langService = inject(LangService)


  
}
