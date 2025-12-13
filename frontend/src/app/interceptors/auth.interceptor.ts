import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  const isAuthEndpoint =
    req.url.includes('/api/auth/login') ||
    req.url.includes('/api/auth/register');

  if (token && req.url.includes('/api') && !isAuthEndpoint) {
    req = req.clone({
      setHeaders: {
        Authorization: token
      }
    });
  }

  return next(req);
};
