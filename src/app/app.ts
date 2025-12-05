import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // Importamos apenas o RouterOutlet
  // O template agora é apenas o local onde as páginas serão carregadas
  template: '<router-outlet></router-outlet>'
})
export class App {}