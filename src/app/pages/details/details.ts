import { Component, computed, inject, signal } from '@angular/core';
import { HttpService } from '../../services/http-service';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { ToastService } from '../../services/toast';
import { ToastComponent } from "../../components/toast/toast";
import { map, Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import * as L from 'leaflet';
import { TranslatePipe } from '../../pipes/translate-pipe';
import { LangService } from '../../services/lang-service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [GoogleMapsModule, ToastComponent,TranslatePipe],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {
  public productData = signal<any>([0]);
  selectedImgIdx = signal<number>(0);
  rentDays = signal<number>(1);
   toastService = inject(ToastService);
  httpService = inject(HttpService);
  langService = inject(LangService);
  
 public cars = this.httpService.cars;
   
  constructor(
    private routes: ActivatedRoute,
    private router: Router
  ) {}


ngOnInit() {

  this.productData.set(this.httpService.cars);


  this.routes.params.subscribe((params) => {
    const id = Number(params['id']);
 
    const foundCar = this.cars.find(c => c.id === id);
    
    if (foundCar) {
      this.productData.set(foundCar);
    }
  });
}


  //image handling

carImages = computed<string[]>(() => {
  const car = this.productData(); 
  if (!car) return [];

  return [car.imageUrl1, car.imageUrl2, car.imageUrl3].filter(
    (url): url is string => !!url && url !== 'null' && url !== 'undefined'
  );
});

  mainImage = computed<string>(() => {
    const images = this.carImages();
    const idx = this.selectedImgIdx();

    if (images.length === 0)
      return 'https://avatars.mds.yandex.net/get-autoru-vos/11386586/ca2020a1f05e88fe6db05ba04181fc0d/1200x900';
    return images[idx] || images[0];
  });


  selectImage(index: number): void {
    this.selectedImgIdx.set(index);
  }






private map: L.Map | undefined;

ngAfterViewInit() {
  const coords: L.LatLngExpression = [41.5615531, 44.9779702]; 

  this.map = L.map('map').setView(coords, 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(this.map);

  L.marker(coords).addTo(this.map)
    .bindPopup('Здесь находится машина!');
}



sendToWhatsapp(car: any) {
  const phone = '995598711717';

  const message = `
Здравствуйте.
Меня интересует:

Марка: ${car.brand}
Модель: ${car.model}
Цена: ${car.price} Лари
На ${this.rentDays()} дня(дней)
Спасибо!.

`;
console.log(message);


  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    '_blank'
  );
}


  
totalPrice = computed(() => {
 
  const basePrice = Number(this.productData()?.price) || 0;
  const days = this.rentDays() || 0;

  if (days <= 0) return 0;

  let discountPerDay = 0;

  if (days <= 3) {
    discountPerDay = 0; 
  } else if (days <= 5) {
    discountPerDay = 10; 
  } else if (days <= 10) {
    discountPerDay = 20; 
  } else {
    discountPerDay = 30; 
  }

  const finalPricePerDay = basePrice - discountPerDay;


  return finalPricePerDay * days;
});

  incrementDays(): void {

      this.rentDays.update((days) => days + 1);
   

    

  }

  decrementDays(): void {
    if (this.rentDays() > 1) {
      this.rentDays.update((days) => days - 1);
    }
  }




exitBtn(){
  this.router.navigate(['']);
}






}
