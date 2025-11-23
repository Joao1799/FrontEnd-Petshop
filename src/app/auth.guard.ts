import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router,private messageService: MessageService,
) {}

  canActivate(): boolean {
    if (!this.auth.isLogged() || this.auth.isTokenExpired()) {
      this.auth.logout();
      this.router.navigate(['/login']);
      this.messageService.add({
      severity: 'error',
      summary: 'Erro de Autenticação',
      detail:'Token expirado.'
      });
      return false;
    }
    return true;
  }
}
