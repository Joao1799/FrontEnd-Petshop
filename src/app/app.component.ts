import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule,RouterOutlet,ToastModule]
})
export class AppComponent {
  title = 'PetshopRegistration';
  usuarioLogado: boolean = false;

  onLoginSuccess(event: boolean) {
    this.usuarioLogado = event; 
    console.log('Usuário logado:', this.usuarioLogado);
  }
}
