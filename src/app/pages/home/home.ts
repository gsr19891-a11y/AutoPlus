import { Component, inject, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { HttpService } from '../../services/http-service';
import { AuthService } from '../../services/auth-service';
import { ToastService } from '../../services/toast';
import { ToastComponent } from "../../components/toast/toast";

@Component({
  selector: 'app-home',
  imports: [RouterLink, ToastComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  PopularCars = signal<any[]>([]);
  FeaturedCars = signal<any[]>([]);

  favoriteCars = signal<number[]>([]);
  toastService = inject(ToastService);
 httpService = inject(HttpService);
  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(){
    this.PopularCarsData();
    this.FeaturedCarsData();

     this.loadFavoriteCars();
  }


public cars = this.httpService.cars;

  PopularCarsData(){
    this.httpService.getPopularCars().subscribe({
      next: (res:any) => {
        console.log(res);
        this.PopularCars.set(res);

        this.PopularCars().map(car=>{
          if(car.imageUrl1 == null){
            car.imageUrl1 = 'https://avatars.mds.yandex.net/get-autoru-vos/11386586/ca2020a1f05e88fe6db05ba04181fc0d/1200x900';
          }

          if(car.imageUrl2 == null){
            car.imageUrl2 = 'https://avatars.mds.yandex.net/get-autoru-vos/6053064/e9f60d5ea011c8c147fc606ed6431b4e/1200x900';
          }

          if(car.imageUrl3 == null){
            car.imageUrl3 = 'https://avatars.mds.yandex.net/get-autoru-vos/2077933/2897b01ab8182f287519f83f5a10db62/1200x900';
          }

          if(car.fuelCapacity == 0){
            car.fuelCapacity = '80';
          }

          if(car.transmission == null){
            car.transmission = 'Automatic';
          }

          if(car.multiplier == 0){
            car.multiplier = '4';
          }

          if(car.price == 0){
            car.price = '260';
          }

          if(car.year == 0){
            car.year = '2005';
          }

          if(car.brand == null){
            car.brand = 'Mercedes';
          }
  
          if(car.model == null){
            car.model = 'S500';
          }
        })

    
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  

  FeaturedCarsData(){
    this.httpService.getFeaturedCars().subscribe({
      next: (res:any) => {
        console.log(res.data);
        this.FeaturedCars.set(res.data);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }



  favoritesToggle() {
  this.authService.favoritesToggle.update(value => !value);
}

addToFav(carId: number, event: MouseEvent) {
  event.preventDefault();
  event.stopPropagation();

   if (this.favoriteCars().includes(carId)) {
    return;
  }

    this.favoriteCars.set([
      ...this.favoriteCars(),
      carId
    ]);
  

     if(localStorage.getItem('phoneNumber') == null){
    return this.toastService.show("Please login to rent a car !");
  }else{
  this.authService
    .addToFavorites(this.authService.userPhoneNumber(), carId)
    .subscribe({
      next: (res) => console.log(res),

      error: (err) => console.log(err)
    });
  }

  console.log(this.favoriteCars());
}


  loadFavoriteCars() {
  const phoneNumber = this.authService.userPhoneNumber();
  if (phoneNumber) {
    this.authService.getFavoriteCars(phoneNumber).subscribe({
      next: (res: any) => {
        const ids = res.map((car: any) => car.carId || car.id);
        this.favoriteCars.set(ids);
      },
      error: (err) => {
        console.log('error:', err);
      }
    });
  }
}



rentCar(carId: number){
  if(localStorage.getItem('phoneNumber') == null){
    return this.toastService.show("Please login to rent a car !");
  }else{
  this.httpService.rentCar(this.authService.userPhoneNumber(), carId).subscribe({
    next: (res: any) => {
      this.toastService.show('Car rented successfully!');
      console.log(res);
      this.sendMessage();
      
    },
    error: (err) => {
      console.log(err);
    }
  })
}
}

sendMessage(carIndex: number = 0) { 
  const cars = this.PopularCars();
  
  const targetCar = cars && cars.length > carIndex ? cars[carIndex] : null;

  this.httpService.postMessage(targetCar?.ownerPhoneNumber || null, targetCar?.id).subscribe({
    next: (res: any) => {
      this.toastService.show('Message sent successfully!');
      console.log(res);
    },
    error: (err) => {
      console.log(err);
    }
  });
}

}
