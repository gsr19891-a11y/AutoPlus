import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../../services/http-service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { ToastService } from '../../services/toast';
import { ToastComponent } from "../../components/toast/toast";

@Component({
  selector: 'app-menu',
  imports: [ReactiveFormsModule, RouterLink, ToastComponent],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {

  httpService = inject(HttpService);
  fb = inject(FormBuilder)
  authService = inject(AuthService)
  toastService = inject(ToastService);

  filterForm!: FormGroup;
  allCarsFilters = signal<any[]>([]);

  favoriteCars = signal<number[]>([]);


  cars = this.httpService.cars


  ngOnInit(){
 this.filterForm = this.fb.group({
    city: [''],
    startYear: [''],
    endYear: [''],
    capacity: [''],
    take: [12],
    page: [1]
  })

  this.loadFavoriteCars();

this.onSubmit()

  }



onSubmit(){

  const { capacity, startYear, endYear, city, page, take } = this.filterForm.value;
  
this.httpService.getFilteredCars(
      capacity || '', 
      startYear || '', 
      endYear || '', 
      city || '', 
      page || 1, 
      take || 12
    ).subscribe({
      next: (res:any) => {
      console.log(res.data);
      this.allCarsFilters.set(res.data);

      const processedCars = (res.data || []).map((car: any)=>{

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

          return car

        })
        this.allCarsFilters.set(processedCars)
    },
    error: (err) => {
      console.log(err);
    }
 
  })

}

onFilterSearch() {
    this.filterForm.patchValue({ page: 1 }); 
    this.onSubmit();
  }


nextPage(){
  const currentPage = this.filterForm.value.page || 1;

  this.filterForm.patchValue({
    page: currentPage + 1
  })
  this.onSubmit();
}

prevPage(){

  const currentPage = this.filterForm.value.page || 1;

  if(currentPage > 1){
    this.filterForm.patchValue({
      page: currentPage - 1
    })
  }
  this.onSubmit();
}


favoritesToggle() {
  this.authService.favoritesToggle.update(value => !value);
}

addToFav(carId: number, event: MouseEvent) {
  event.preventDefault();
  event.stopPropagation();
  if(localStorage.getItem('phoneNumber') == null){
    return this.toastService.show("Please login to rent a car !");
    this.authService.favoritesToggle.set(false);
  }else{

   if (this.favoriteCars().includes(carId)) {
    return;
  }

    this.favoriteCars.set([
      ...this.favoriteCars(),
      carId
    ]);
  
 
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
    return this.toastService.show("Please login to rent a car");
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
  const cars = this.allCarsFilters();
  

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