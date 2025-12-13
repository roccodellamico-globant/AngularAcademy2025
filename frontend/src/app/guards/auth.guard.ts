import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  const token = localStorage.getItem('token');

  // No hay token
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  try {
    // Decodificar payload del JWT
    const payload = JSON.parse(atob(token.split('.')[1]));

    // Verificar expiración
    const isExpired = payload.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.removeItem('token');
      router.navigate(['/login']);
      return false;
    }

    // Token válido
    return true;

  } catch (error) {
    // Token mal formado
    localStorage.removeItem('token');
    router.navigate(['/login']);
    return false;
  }
};
