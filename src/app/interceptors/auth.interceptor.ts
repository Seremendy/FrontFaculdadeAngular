import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Tenta pegar o token salvo no navegador
  const token = localStorage.getItem('token');

  // 2. Se tiver token, a gente clona a requisição e adiciona o cabeçalho
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    // Passa a requisição alterada (com token) para frente
    return next(cloned);
  }

  // 3. Se não tiver token (login), passa a requisição original
  return next(req);
};