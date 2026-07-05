import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../services/http-service';
import { AuthService } from '../../services/auth-service';
import { first } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

registerForm!: FormGroup;

constructor(
  private httpService: HttpService,
  private authService: AuthService,
  private fb: FormBuilder,
  private router: Router
) {}


ngOnInit() {

  this.registerForm = this.fb.group({
    phoneNumber: ['',Validators.required],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).{8,16}$/)]],
    firstName: ['',Validators.required],
    lastName: ['',Validators.required],
    email: ['',Validators.required],
    role: ['User',Validators.required]
  })

}

onSubmit(){
  this.authService.register(this.registerForm.value).subscribe({
    next: (res: any) => {
      console.log(res);
      localStorage.setItem('userEmail', res.email);
      localStorage.setItem('phoneNumber', res.phoneNumber);
      localStorage.setItem('userEmail', res.email);
      console.log(res.phoneNumber);

        this.router.navigate(['']);
    },
    error: (err) => {
      console.log(err);
    }
  })
}


}
