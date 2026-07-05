import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { register } from 'swiper/element/bundle';


register();

@Component({
  selector: 'app-tech',
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './tech.html',
  styleUrl: './tech.scss',
  standalone: true
})
export class Tech {

ngOnInit() {
  
    register();
  }
}
