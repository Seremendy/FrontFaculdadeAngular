import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  // 1. Tentar recuperar o token salvo no login
  const token = localStorage.getItem('meuToken');

  // 2. Se o token existir, clonamos a requisição e adicionamos o cabeçalho
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}` // O padrão é "Bearer " + token
      }
    });
    // Passa a requisição modificada para frente
    return next(authReq);
  }

  // 3. Se não tiver token, manda a requisição original mesmo (ex: página de login)
  return next(req);
};