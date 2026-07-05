import { Component, computed, inject, signal } from '@angular/core';
import { HttpService } from '../../services/http-service';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { AuthService } from '../../services/auth-service';
import { ToastService } from '../../services/toast';
import { ToastComponent } from "../../components/toast/toast";
import { map, Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import * as L from 'leaflet';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [GoogleMapsModule, ToastComponent],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {
  public productData = signal<any>([0]);
  selectedImgIdx = signal<number>(0);
  rentDays = signal<number>(1);
   toastService = inject(ToastService);
  httpService = inject(HttpService);
  
 public cars = this.httpService.cars;
   
  constructor(
    private routes: ActivatedRoute,
    private authService: AuthService,
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

  // maps:

//   mapOptions: google.maps.MapOptions = {
//     disableDefaultUI: false,
//     mapTypeControl: false,
//     streetViewControl: false,
//   };

// coordinates = computed<google.maps.LatLngLiteral>(() => {
//   const data = this.productData();
  
 
//   if (!data?.latitude || !data?.longitude) {
//     return { lat: 41.7151, lng: 44.8271 };
//   }

//   return {
//     lat: Number(data.latitude),
//     lng: Number(data.longitude),
//   };
// });







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
`;
console.log(message);


  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    '_blank'
  );
}


  
  totalPrice = computed(() => {
    const carPrice = Number(this.productData()?.price) || 0;
    return carPrice * this.rentDays();
  });

  incrementDays(): void {
    this.rentDays.update((days) => days + 1);
  }

  decrementDays(): void {
    if (this.rentDays() > 1) {
      this.rentDays.update((days) => days - 1);
    }
  }

  rentCar(carId: number){
  if(localStorage.getItem('phoneNumber') == null){
    return this.toastService.show("Please login to rent a car");
  }else{

  this.httpService.rentCar(this.authService.userPhoneNumber(), carId, this.rentDays()).subscribe({
    next: (res: any) => {
      this.toastService.show('Car rented successfully!');
      console.log(carId);
      this.sendMessage();


      
    },
    error: (err) => {
      console.log(err);
    }
  })
}
}


exitBtn(){
  this.router.navigate(['']);
}

sendMessage(){
  this.httpService.postMessage(this.productData()?.ownerPhoneNumber || null, this.productData()?.id).subscribe({
    next: (res: any) => {
      this.toastService.show('Message sent successfully!');
      console.log(res);
      
    },
    error: (err) => {
      console.log(err);
    }
  })
}




}
