import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const messageService = inject(MessageService);

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(req).pipe(
    catchError((error) => {

      if (error.status === 401) {
        console.warn("Token inválido ou expirado!");
        messageService.add({
          severity: 'error',
          summary: 'Erro de Autenticação',
          detail:'Token expirado, faça login novamente.'
        });
        localStorage.removeItem('token');
        router.navigate(['/login']);
      }
      if (error.status === 403) {
        console.log(error.error.msg)
        console.warn("Token inválido ou expirado!");
        messageService.add({
          severity: 'error',
          summary: 'Erro de Autenticação',
          detail:error.error.msg || 'Token inválido ou expirado.'
        });
        localStorage.removeItem('token');
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};
