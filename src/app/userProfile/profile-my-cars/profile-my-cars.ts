import { Component, signal } from '@angular/core';
import { HttpService } from '../../services/http-service';
import { AuthService } from '../../services/auth-service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-profile-my-cars',
  imports: [RouterLink],
  templateUrl: './profile-my-cars.html',
  styleUrl: './profile-my-cars.scss',
})
export class ProfileMyCars {

  myCars = signal<any[]>([])

  constructor(
    private httpService: HttpService,
    private authService: AuthService
  ){}

  ngOnInit(){
    this.getMyCars(this.authService.userPhoneNumber())
  }


getMyCars(phone: string) {
  this.httpService.getCarByOwner(phone).subscribe({
    next: (res: any) => {
      console.log(res);
      this.myCars.set(res);
    },
    error: (err) => {
      console.log(err);
      if (err.status === 404) {
        this.myCars.set([]);
        console.log(this.myCars());
        
      }
    }
  });
}




}
