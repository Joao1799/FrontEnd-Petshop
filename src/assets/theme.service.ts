import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private tema = 'light';

  constructor() {
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo) {
      this.tema = temaSalvo;
      this.aplicarTema();
    }
  }

  alternarTema() {
    this.tema = this.tema === 'light' ? 'dark' : 'light';
    localStorage.setItem('tema', this.tema);
    this.aplicarTema();
  }

  aplicarTema() {
    const body = document.body;

    if (this.tema === 'dark') {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
  }

  temaAtual() {
    return this.tema;
  }
}
