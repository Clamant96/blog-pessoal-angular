import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  /* AO SER CARREGADO O COMPONENT home, VERIFIQUE A CONDICAO */
  ngOnInit() {
    /* VERIFICA SE O VALOR CONTIDO DENTRO DO TOKEN NO VALOR GLOBAL E IGUAL A VAZIO/NULO */
    /* CASO SEJA, REDIRECIONA O USUARIO AO LOGIN */
    if(environment.token == '') {
      /* ENVIA UMA MENSAGEM AO USUARIO */
      //alert('Sua sessao expirou, faca o login novamente!')

      /* REDIRECIONA O USUARIO A PAGINA DE LOGIN */
      this.router.navigate(['/login'])

    }

  }

  publicarOver() {
    window.document.querySelector('#publicacao')?.setAttribute('style', 'background-color: var(--button-ok) !important;');

  }

  publicarOut() {
    window.document.querySelector('#publicacao')?.setAttribute('style', 'background-color: var(--background-color-button) !important;');

  }

  remover() {
    if(window.document.URL != '/home') {
      window.document.querySelector('.botao-postagem')?.setAttribute('style', 'display: none !important;');

    }

  }

}
