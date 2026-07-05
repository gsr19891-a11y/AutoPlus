import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { HttpService } from '../../services/http-service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-rent-cars',
  imports: [RouterLink],
  templateUrl: './profile-rent-cars.html',
  styleUrl: './profile-rent-cars.scss',
})
export class ProfileRentCars implements OnInit {

  rentProducts = signal<any[]>([]);

  constructor(
    private authService: AuthService,
    private httpService: HttpService,
    private routes: ActivatedRoute
  ) {}

  ngOnInit() {
    
    this.routes.parent?.paramMap.subscribe(params => {
      const phoneNumber = params.get('phoneNumber');
      if (phoneNumber) {
        this.getRentCars(phoneNumber);
      }
    });
  }

  getRentCars(phoneNumber: string) {
    this.authService.getRentCars(phoneNumber).subscribe({
      next: (res: any) => {
        this.rentProducts.set(res);
        console.log(this.rentProducts());
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}