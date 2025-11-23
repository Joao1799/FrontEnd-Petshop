import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  private safeLocalStorageGet(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
    return null;
  }

  private safeLocalStorageRemove(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }

  getToken() {
    return this.safeLocalStorageGet('token');
  }

  isLogged() {
    return !!this.getToken();
  }

  logout() {
    this.safeLocalStorageRemove('token');
    this.safeLocalStorageRemove('usuarioLogado');
  }

  // VERIFICAR EXPIRAÇÃO DO TOKEN
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;
    const decoded: any = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  }
}
