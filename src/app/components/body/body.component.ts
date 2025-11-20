import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { MessageService } from 'primeng/api';

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
    infosUsuarioLogado!: any | null;
    cargo!: string | null;
    name!: string | null;

    constructor(
        private router: Router,
        private auth: AuthService, 
        private messageService: MessageService
    ){};
    
    ngOnInit() {
        this.isBrowser = typeof window !== 'undefined';
        this.getUsuarioLogado()
    }

    getInfoUser() {
    const data = localStorage.getItem('usuarioLogado');
    return data ? JSON.parse(data) : null;
    }

    getUsuarioLogado() {
    this.infosUsuarioLogado = this.getInfoUser();
    this.cargo = this.infosUsuarioLogado.cargo
    this.name = this.infosUsuarioLogado.name
    }

    logout() {
        console.log("chamei");
        
    this.auth.logout();               // tira o token
    this.router.navigate(['/login']); // redireciona

    this.messageService.add({
      severity: 'success',
      summary: 'Logout',
      detail: 'Sessão encerrada com sucesso'
    });
  }

    showDialog() {
        if (this.isBrowser) { 
            this.visible = true;
        }
    }
}
