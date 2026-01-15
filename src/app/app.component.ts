import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterOutlet, ToastModule]
})
export class AppComponent {

  loading = true;

  ngAfterViewInit() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
}
