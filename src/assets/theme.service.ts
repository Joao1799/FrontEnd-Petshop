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

  alternarTema(light?: string) {
    this.tema = this.tema === 'light' ? 'dark' : 'light';
    if(light) this.tema = light
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

  setTheme(theme: 'light' | 'dark') {
    localStorage.setItem('theme', theme);
    this.alternarTema()
  }

  temaAtual() {
    return this.tema;
  }
}
