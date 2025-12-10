import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  // Garanta que o arquivo app.html existe na mesma pasta.
  templateUrl: './app.html',
  // Se você não criou o arquivo app.css, remova a linha abaixo ou crie um arquivo vazio com esse nome.
  styleUrls: ['./app.css'] 
})
export class AppComponent {
  title = 'Universidade App';
}