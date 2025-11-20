import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-menuLateral',
  standalone: true,
  imports: [MenubarModule,ButtonModule],
  templateUrl: './menuLateral.component.html',
  styleUrl: './menuLateral.component.scss'
})
export class menuLateralrComponent {
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
          label:'Registros',
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
