import { Component, signal } from '@angular/core';
import { HttpService } from '../../services/http-service';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {

  userInfo = signal<any>(null)

  constructor(
    private httpService: HttpService,
    public authService: AuthService,
    private router: Router
  ){}


  ngOnInit(){
    if(this.authService.userPhoneNumber() == null){
      this.router.navigate(['']);
    }
    this.authService.getUser(this.authService.userPhoneNumber()).subscribe({
      next: (res: any) => {
        console.log(res);
        this.userInfo.set(res);
      },
      error: (err) => {
        console.log(err);
      }
    })




  }



}
