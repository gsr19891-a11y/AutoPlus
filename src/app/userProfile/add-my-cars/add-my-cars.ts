import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../services/http-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-my-cars',
  imports: [ReactiveFormsModule],
  templateUrl: './add-my-cars.html',
  styleUrl: './add-my-cars.scss',
})
export class AddMyCars {
  addCarForm!: FormGroup;

  constructor(
    private httpService: HttpService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.addCarForm = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: [null, Validators.required],
      transmission: [''],
      price: [null, Validators.required],
      multiplier: [null],
      capacity: [null],
      fuelCapacity: [null],
      city: ['', Validators.required],
      image1: [null],
      image2: [null],
      image3: [null],
      ownerPhoneNumber: ['']
    });
  }

  onSubmit() {
    if (this.addCarForm.invalid) {
      alert('Please fill in all the required fields.');
      return;
    }


    const phoneNumber = localStorage.getItem('phoneNumber') || '';
    const userEmail = localStorage.getItem('userEmail') || '';

    const formData = new FormData();
    formData.append('Brand', this.addCarForm.value.brand);
    formData.append('Model', this.addCarForm.value.model);
    formData.append('Year', String(this.addCarForm.value.year));
    formData.append('Price', String(this.addCarForm.value.price));
    formData.append('Capacity', String(this.addCarForm.value.capacity || 0));
    formData.append('Transmission', this.addCarForm.value.transmission);
    formData.append('City', this.addCarForm.value.city);
    formData.append('FuelCapacity', String(this.addCarForm.value.fuelCapacity || 0));
    
    formData.append('CreatedBy', new Date().toISOString());
    formData.append('CreatedByEmail', userEmail);
    formData.append('OwnerPhoneNumber', phoneNumber);


    if (this.addCarForm.value.image1 instanceof File) {
      formData.append('Image1', this.addCarForm.value.image1);
    }
    if (this.addCarForm.value.image2 instanceof File) {
      formData.append('Image2', this.addCarForm.value.image2);
    }
    if (this.addCarForm.value.image3 instanceof File) {
      formData.append('Image3', this.addCarForm.value.image3);
    }

    this.httpService.addCar(formData).subscribe({
      next: (res) => {
        console.log(res);
        alert('Car added successfully!');
        this.router.navigate(['']);
      },
      error: (err) => console.log(err)
    });
  }

  onFileChange(event: Event, field: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.addCarForm.patchValue({
        [field]: file
      });
    }
  }
}