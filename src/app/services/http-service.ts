import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
      price: 150,
      year: 2014,
      multiplier: 5,
      fuelCapacity: 80,
      transmission: 'Automatic',
      imageUrl1: '/xtera.jpg',
      imageUrl3: '/xtera1.jpg',
      imageUrl2:
        '/IMG_5993.webp',
      prices1: "1-3 days - 150₾",
      prices2: "4-5 days - 130₾",
      prices3: "6-10 days - 120₾",
      prices4: "11+ days - 110₾",
        description:
        'Nissan X-Tera — იდეალური პარტნიორი თქვენი თავგადასავლებისთვის! ეძებთ საიმედო ავტომობილს საქართველოს ულამაზესი ბუნების დასალაშქრად? ეს 2014 წლის Nissan X-Tera მზად არის ნებისმიერი სირთულის მარშრუტისთვის!',
      latitude: 41.56061,
      longitude: 44.9771,
    },
    {
      id: 3,
      brand: 'Jeep',
      model: 'Compass',
      price: 110,
      year: 2015,
      fuelCapacity: 53,
      multiplier: 5,
      transmission: 'Automatic',
      imageUrl1: '/jeep1.jpg',
      imageUrl2: '/jeep2.webp',
      imageUrl3: '/jeep3.webp',
      description:"Jeep Compass — იდეალური პარტნიორი თქვენი კომფორტული მგზავრობისთვის! ეძებთ კომპაქტურ, მანევრულ და სტილურ ავტომობილს საქართველოს ქალაქებსა თუ თვალწარმტაც კუთხეებში სამოგზაუროდ? ეს თანამედროვე Jeep Compass მზად არის თქვენი თავგადასავლები მაქსიმალურად სასიამოვნო და საიმედო გახადოს!",
      prices1: "1-3 days - 110₾",
      prices2: "4-5 days - 100₾",
      prices3: "6-10 days - 90₾",
      prices4: "11+ days - 80₾",
    },
    {
      id: 4,
      brand: 'Nissan',
      model: 'Rogue',
      multiplier: 5,
      year: 2016,
      fuelCapacity: 53,
      price: 120,
      transmission: 'Automatic',
      imageUrl1: '/niss1.jpg',
      imageUrl2:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/2016_Nissan_Rogue%2C_Front_Left%2C_04-13-2021.jpg/960px-2016_Nissan_Rogue%2C_Front_Left%2C_04-13-2021.jpg',
      imageUrl3:
        'https://avatars.mds.yandex.net/get-autoru-vos/5965445/ed2605aa11d866c29e1973eeae7ca6e8/1200x900',
        description:"Nissan Rogue — იდეალური პარტნიორი თქვენი კომფორტული მგზავრობისთვის! ეძებთ საიმედო, ეკონომიურ და ტევად ავტომობილს საქართველოს ქალაქებსა თუ თვალწარმტაც კუთხეებში სამოგზაუროდ? ეს თანამედროვე Nissan Rogue მზად არის თქვენი თავგადასავლები მაქსიმალურად სასიამოვნო და უსაფრთხო გახადოს!",
        prices1: "1-3 days - 120₾",
      prices2: "4-5 days - 110₾",
      prices3: "6-10 days - 100₾",
      prices4: "11+ days - 90₾",
    },
  ];
}
