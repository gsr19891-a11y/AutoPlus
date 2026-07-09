import { Component, inject, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { HttpService } from '../../services/http-service';
import { ToastService } from '../../services/toast';
import { ToastComponent } from "../../components/toast/toast";
import {  TranslatePipe } from '../../pipes/translate-pipe';
import { LangService } from '../../services/lang-service';


@Component({
  selector: 'app-home',
  imports: [RouterLink, ToastComponent,TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
 httpService = inject(HttpService);

public cars = this.httpService.cars;

langService = inject(LangService)

 

  



}
