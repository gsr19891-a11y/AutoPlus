import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getToken() {
    return localStorage.getItem('token');
  }

  getCars() {
    return this.http.get('https://rentcar.stepprojects.ge/api/Car', {
      headers: {
        Accept: 'application/json',
      },
    });
  }

  getPopularCars() {
    return this.http.get('https://rentcar.stepprojects.ge/api/Car/popular', {
      headers: {
        Accept: 'application/json',
      },
    });
  }

  getFeaturedCars() {
    return this.http.get(
      'https://rentcar.stepprojects.ge/api/Car/paginated?pageIndex=1&pageSize=12',
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
  }

  getCarById(id: number) {
    return this.http.get(`https://rentcar.stepprojects.ge/api/Car/${id}`, {
      headers: {
        Accept: 'application/json',
      },
    });
  }

  getFilteredCars(
    capacity: number,
    startYear: number,
    endYear: number,
    city: string,
    pageIndex: number,
    pageSize: number,
  ) {
    return this.http.get(
      `https://rentcar.stepprojects.ge/api/Car/filter?capacity=${capacity}&startYear=${startYear}&endYear=${endYear}&city=${city || ''}&pageIndex=${pageIndex || 1}&pageSize=${pageSize || 12}`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
  }

  addCar(formData: FormData) {
    return this.http.post('https://rentcar.stepprojects.ge/api/Car', formData);
  }

  getCarByOwner(phone: string) {
    return this.http.get(`https://rentcar.stepprojects.ge/api/Car/byPhone?PhoneNumber=${phone}`, {
      headers: {
        Accept: 'application/json',
      },
    });
  }

  postMessage(phoneNumber: string, cartId: number) {
    return this.http.post(
      `https://rentcar.stepprojects.ge/Message/Message?phoneNumber=${phoneNumber}&CarId=${cartId}`,
      null,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
  }

  rentCar(phoneNumber: string, carId: number, multiplier: number = 1) {
    return this.http.post(
      `https://rentcar.stepprojects.ge/Purchase/purchase?phoneNumber=${phoneNumber}&carId=${carId}&multiplier=${multiplier}`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
  }

  public cars = [
    {
      id: 1,
      brand: 'Nissan',
      model: 'X-Tera',
      price: 100,
      year: 2012,
      multiplier: 5,
      fuelCapacity: 80,
      transmission: 'Automatic',
      imageUrl1: '/xtera.jpg',
      imageUrl2: '/xtera1.jpg',
      imageUrl3:
        'https://scontent.ftbs5-3.fna.fbcdn.net/v/t39.30808-6/482227681_9185414464878175_7404009657496892826_n.jpg?stp=dst-jpg_tt6&cstp=mx1280x958&ctp=s1280x958&_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=cjWcK8oVMIcQ7kNvwG3jPzy&_nc_oc=Adq_2mJYVH6cr4ayCYVxFXU7sfNMP-3d-r1M3_IuLBeVlNYDjhPbWWAeYfK69yfQIjo&_nc_zt=23&_nc_ht=scontent.ftbs5-3.fna&_nc_gid=sXbge6s6kqeu0ZDeBfyJIg&_nc_ss=7b2a8&oh=00_Af-E2p4JuqPbGKYKWf3QZSy6FrZsXzHxSPaucGk1YQg--g&oe=6A44B411',
      description:
        'Nissan X-Tera — იდეალური პარტნიორი თქვენი თავგადასავლებისთვის! ეძებთ საიმედო ავტომობილს საქართველოს ულამაზესი ბუნების დასალაშქრად? ეს 2012 წლის Nissan X-Tera მზად არის ნებისმიერი სირთულის მარშრუტისთვის!',
      latitude: 41.56061,
      longitude: 44.9771,
    },
    {
      id: 2,
      brand: 'Nissan',
      model: 'Rogue',
      year: 2012,
      price: 100,
      multiplier: 5,
      fuelCapacity: 80,
      transmission: 'Automatic',
      imageUrl1: '/rouge1.jpg',
      imageUrl2: '/rouge2.jpg',
    },
    {
      id: 3,
      brand: 'Jeep',
      model: 'Compass',
      price: 100,
      year: 2015,
      fuelCapacity: 80,
      multiplier: 5,
      transmission: 'Automatic',
      imageUrl1: '/jeep1.jpg',
      imageUrl2: '/jeep2.webp',
      imageUrl3: '/jeep3.webp',
    },
    {
      id: 4,
      brand: 'Nissan',
      model: 'Rogue',
      multiplier: 5,
      year: 2016,
      fuelCapacity: 80,
      price: 100,
      transmission: 'Automatic',
      imageUrl1: '/niss1.jpg',
      imageUrl2:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/2016_Nissan_Rogue%2C_Front_Left%2C_04-13-2021.jpg/960px-2016_Nissan_Rogue%2C_Front_Left%2C_04-13-2021.jpg',
      imageUrl3:
        'https://avatars.mds.yandex.net/get-autoru-vos/5965445/ed2605aa11d866c29e1973eeae7ca6e8/1200x900',
    },
  ];
}
