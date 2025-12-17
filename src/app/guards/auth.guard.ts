import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const estaLogado = authService.isLoggedIn();

  console.log('🛡️ AuthGuard verificando rota:', state.url);
  console.log('🔑 Usuário está logado?', estaLogado);

  if (estaLogado) {
    return true; // Pode passar
  } else {
    console.warn('⛔ Acesso negado! Redirecionando para login...');
    router.navigate(['/login']);
    return false; // Barrado
  }
};