import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../../services/http-service';
import { RouterLink } from '@angular/router';
import { ToastService } from '../../services/toast';
import { ToastComponent } from "../../components/toast/toast";
import { TranslatePipe } from '../../pipes/translate-pipe';
import { LangService } from '../../services/lang-service';

@Component({
  selector: 'app-menu',
  imports: [ReactiveFormsModule, RouterLink, ToastComponent,TranslatePipe],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {

  httpService = inject(HttpService);
  cars = this.httpService.cars
  langService = inject(LangService)


  



}