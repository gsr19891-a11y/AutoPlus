import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { HttpService } from './http-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public userEmail = signal<any>(null)
  public userPhoneNumber = signal<any>(null)
  favoritesToggle = signal(false);
  public message = signal<any>(null)



  constructor(
    private http: HttpClient,
    private httpService: HttpService
  ){}


  login(form: any) {
    return this.http.post('https://rentcar.stepprojects.ge/api/Users/login', form, {
      headers: {
        'Accept': 'application/json'
      }
    });
  }


 register(form: any) {
    return this.http.post('https://rentcar.stepprojects.ge/api/Users/register', form, {
      headers: {
        'Accept': 'application/json'
      }
    });
  }


  getPhoneNumber(){
    this.userPhoneNumber.set(localStorage.getItem('phoneNumber'))
  }

getUserEmail(){
  this.userEmail.set(localStorage.getItem('userEmail'))
}

  getUser(phone:string){
    return this.http.get(`https://rentcar.stepprojects.ge/api/Users/${phone}`,{
      headers: {
        'Accept': 'application/json'
      }
    })
  }



  getRentCars(phone:string){
    return this.http.get(`https://rentcar.stepprojects.ge/Purchase/${phone}`, {
      headers: {
        'Accept': 'application/json'
      }
    })
  }


  getFavoriteCars(phone:string){
    return this.http.get(`https://rentcar.stepprojects.ge/api/Users/${phone}/favorite-cars`, {
      headers: {
        'Accept': 'application/json'
      }
    })
  }


  addToFavorites(phone:string, carId: number){
    return this.http.post(`https://rentcar.stepprojects.ge/api/Users/${phone}/favorites/${carId}`, null, {
      headers: {
        'Accept': 'application/json'
      }
    })
  }


  getToken(){
    return localStorage.getItem('token')
  }


  getMessage(phoneNumber: string){
    return this.http.get(`https://rentcar.stepprojects.ge/Message/Messages?phoneNumber=${phoneNumber}`,{
      headers: {
        'Accept': 'application/json'
      }
    })
  }


}
