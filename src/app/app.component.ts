import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { HomeComponent } from './components/body/home/home.component';
import { BodyComponent } from "./components/body/body.component";
import { menuLateralrComponent } from "./components/menuLateral/menuLateral.component";
import { LoginComponent } from "./components/login/login.component";
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, BodyComponent, menuLateralrComponent, LoginComponent,RouterOutlet]
})
export class AppComponent {
  title = 'PetshopRegistration';
  usuarioLogado: boolean = false;

  onLoginSuccess(event: boolean) {
    this.usuarioLogado = event; 
    console.log('Usuário logado:', this.usuarioLogado);
  }
}
