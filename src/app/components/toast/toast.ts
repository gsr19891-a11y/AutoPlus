import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast'; 

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class ToastComponent {
message: string | null = null;

  private timeoutId: any; 

  constructor(
  private toastService: ToastService,
  private change:ChangeDetectorRef
  ) {}

  ngOnInit() {

    this.toastService.toastState$.subscribe((msg: string) => {
   
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }

  
      this.message = msg;

  
      this.timeoutId = setTimeout(() => {
  this.message = null;
  this.change.detectChanges();
}, 3000);
    });
  }

}