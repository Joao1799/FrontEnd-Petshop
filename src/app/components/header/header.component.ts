import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule,ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  items: MenuItem[] = [];

    constructor(private router: Router){};
  
    ngOnInit() {
      this.menuBar();
    }

  menuBar(){
    this.items = [
      {
          label:'Dashboard',
          icon: 'pi pi-home',
          routerLink: '/home'
      },
      {
          label:'Atendimentos',
          icon: 'pi pi-calendar'
      },
      {
        label: 'Cliente',
        icon: 'pi pi-user-plus',
        routerLink: '/registrarUsuario',
      },
      {
        label: 'Pet',
        icon: 'fa fa-dog',
        routerLink: '/registrarPet',
      },
      {
        label: 'Serviço',
        icon: 'fa fa-calendar-days',
        routerLink: '/registrarServico',
      },
        
      
  ]
  }
}
