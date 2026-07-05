import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { HttpService } from '../../services/http-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-profile-my-favorites',
  imports: [RouterLink],
  templateUrl: './profile-my-favorites.html',
  styleUrl: './profile-my-favorites.scss',
})
export class ProfileMyFavorites implements OnInit {

  favoriteCars = signal<any[]>([]);

  constructor(
    private authService: AuthService,
    private httpService: HttpService,
    private routes: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.routes.parent?.paramMap.subscribe(params => {
      const phoneNumber = params.get('phoneNumber');
      if (phoneNumber) {
        this.getFavCars(phoneNumber);
      }
    });
  }

  getFavCars(phoneNumber: string) {

    this.authService.getFavoriteCars(phoneNumber).subscribe({
      next: (res: any) => {
        const uniqueCars = res.filter((car: any, index: number, self: any[]) => 
          index === self.findIndex((t: any) => t.id === car.id)
        );
        this.favoriteCars.set(uniqueCars);
        console.log(this.favoriteCars());
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  rentCar(carId: number){
  if(localStorage.getItem('phoneNumber') == null){
    return this.toastService.show("Please login to rent a car");
  }else{
  this.httpService.rentCar(this.authService.userPhoneNumber(), carId).subscribe({
    next: (res: any) => {
      this.toastService.show('Car rented successfully!');
      console.log(carId);

      
    },
    error: (err) => {
      console.log(err);
    }
  })
}
}
}