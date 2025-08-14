import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-body',
    standalone: true,
    templateUrl: './body.component.html',
    styleUrl: './body.component.scss',
    imports: [CommonModule,ButtonModule,InputTextModule,RouterOutlet, HeaderComponent,DialogModule]
})
export class BodyComponent {
    visible: boolean = false;
    isBrowser: boolean = false;

    constructor(){};
    
    ngOnInit() {
        this.isBrowser = typeof window !== 'undefined';
    }

    showDialog() {
        if (this.isBrowser) { 
            this.visible = true;
        }
    }
}
