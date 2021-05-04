import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

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

  ajustar() {
    if(window.document.URL != '/home') {
      window.document.querySelector('.botao-postagem')?.setAttribute('style', 'display: block !important;');
      window.document.querySelector('.botao-postagem')?.setAttribute('style', 'justify-content: center !important;');
      window.document.querySelector('.botao-postagem')?.setAttribute('style', 'align-items: center !important;');

    }

  }

}
