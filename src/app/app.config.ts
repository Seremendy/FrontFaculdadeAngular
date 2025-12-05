import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
// Importação do interceptor (que vamos criar a seguir)
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    
    // CORREÇÃO: Chamamos provideHttpClient UMA vez, com várias funcionalidades
    provideHttpClient(
      withFetch(), // Usa a API Fetch moderna (melhor performance)
      withInterceptors([authInterceptor]) // Regista o nosso interceptor de segurança
    )
  ]
};