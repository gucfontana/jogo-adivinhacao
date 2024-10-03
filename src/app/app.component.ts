import { Component } from '@angular/core';
import { MembroRanking } from "./models/membro-ranking";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public dicaNumeroMaiorQue: number = 1;
  public dicaNumeroMenorQue: number = 100;

  public numeroDigitado: number = 0;
  public numeroSecreto: number = 0;

  public jogoEstaFinalizado: boolean = false;

  public numerosDigitados: number[] = [];

  public dificuldadeSelecionada: string = "";
  public tentativasRestantes: number = 0;
  public pontuacao: number = 100;

  public ranking: MembroRanking[] = [];

  constructor() {
    this.reiniciar();
  }

  public adivinhar(): void {
    this.numerosDigitados.push(this.numeroDigitado);

    this.tentativasRestantes--;

    if (this.tentativasRestantes <= 0) {
      this.jogoEstaFinalizado = true;

      return;
    }

    if (this.numeroDigitado < this.numeroSecreto)
      this.dicaNumeroMaiorQue = this.numeroDigitado;
    else if (this.numeroDigitado > this.numeroSecreto)
      this.dicaNumeroMenorQue = this.numeroDigitado;
    else {
      this.jogoEstaFinalizado = true;

      const membroRanking: MembroRanking = {
        pontuacao: this.pontuacao,
        dificuldade: this.dificuldadeSelecionada,
      };

      this.ranking.push(membroRanking);

      return;
    }

    const diferencaNumerica: number = this.numeroSecreto - this.numeroDigitado;

    if (diferencaNumerica >= 10) this.pontuacao -= 10;
    else if (diferencaNumerica >= 5) this.pontuacao -= 5;
    else this.pontuacao -= 2;
  }

  public reiniciar(): void {
    this.dicaNumeroMaiorQue = 1;
    this.dicaNumeroMenorQue = 100;

    this.numeroDigitado = 1;
    this.jogoEstaFinalizado = false;

    this.numerosDigitados = [];

    this.dificuldadeSelecionada = "";
    this.pontuacao = 100;
  }

  public selecionarDificuldade(dificuldade: string): void {
    this.dificuldadeSelecionada = dificuldade;

    if (dificuldade == "Fácil") {
      this.dicaNumeroMenorQue = 10;

      this.tentativasRestantes = 3;

      this.numeroSecreto = Math.floor(Math.random() * 10) + 1;
    } else if (dificuldade == "Médio") {
      this.dicaNumeroMenorQue = 50;

      this.tentativasRestantes = 6;

      this.numeroSecreto = Math.floor(Math.random() * 50) + 1;
    } else {
      this.dicaNumeroMenorQue = 100;

      this.tentativasRestantes = 7;

      this.numeroSecreto = Math.floor(Math.random() * 100) + 1;
    }
  }

  public obterRankingPorPontuacao(): MembroRanking[] {
    return this.ranking.sort(this.ordernarPorPontuacao);
  }

  private ordernarPorPontuacao(a: MembroRanking, b: MembroRanking): number {
    return b.pontuacao - a.pontuacao;
  }
}
