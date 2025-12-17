import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Recupera o token do armazenamento local
  const token = localStorage.getItem('auth_token');

  // 2. Se tiver token, clona a requisição e adiciona o cabeçalho
  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq);
  }

  // 3. Se não tiver token, manda a requisição original mesmo (ex: tela de login)
  return next(req);
};