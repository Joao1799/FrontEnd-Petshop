import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-menuLateral',
  standalone: true,
  imports: [MenubarModule,ButtonModule],
  templateUrl: './menuLateral.component.html',
  styleUrl: './menuLateral.component.scss'
})
export class menuLateralrComponent {

    constructor(private router: Router){};
  
    ngOnInit() {
      this.menuBar();
    }

  menuBar(){

  }
}
