import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../services/http-service';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

loginForm!: FormGroup;

constructor(
  private httpService: HttpService,
  private authService: AuthService,
  private fb: FormBuilder,
  private router: Router
) {}


ngOnInit() {

  this.loginForm = this.fb.group({
    phoneNumber: ['',Validators.required],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).{8,16}$/)]],
    firstName: [''],
    lastName: [''],
    email: [''],
    role: ['User']
  })

}

onSubmit(){
  this.authService.login(this.loginForm.value).subscribe({
    next: (res: any) => {
      console.log(res);
      localStorage.setItem('token', res.token);
      localStorage.setItem('phoneNumber', res.phoneNumber);
      localStorage.setItem('userEmail', res.email);
      this.authService.userPhoneNumber.set(res.phoneNumber);

      this.router.navigate(['']);
    },
    error: (err) => {
      console.log(err);
    }
  })
}



}
