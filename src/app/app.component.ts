import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Jogo de Adivinhação';
  guess: number = 0;
  message: string = '';
  private targetNumber: number = 42;

  checkGuess() {
    if (this.guess === this.targetNumber) {
      this.message = 'Parabéns! Você acertou!';
    } else if (this.guess < this.targetNumber) {
      this.message = 'Tente um número maior.';
    } else {
      this.message = 'Tente um número menor.';
    }
  }
}
