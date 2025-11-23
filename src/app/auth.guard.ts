import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const isRootUrl = state.url === '/' || state.url === '';

    if (!this.auth.isLogged() || this.auth.isTokenExpired()) {
      this.auth.logout();
      if (isRootUrl) {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/login']);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro de Autenticação',
          detail: 'Token expirado.'
        });
      }

      return false;
    }
    if (isRootUrl) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
