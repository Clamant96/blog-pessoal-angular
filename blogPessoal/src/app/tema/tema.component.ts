import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  /* INSTANCIA UM NOVO OBJETO TEMA */
  tema: Tema = new Tema();
  /* CRIA UMA VARIAVEL DO TIPO Tema, SE TRATA DE UM ARRAY, RESPOSAVEL POR ARMAZENAR OS DADOS VINDO DE Tema() */
  listaTema: Tema[];

  constructor(
    private router: Router,
    private temaService: TemaService,
    private alertas: AlertasService

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

    if(environment.tipo != 'adm') {
      this.alertas.showAlertInfo('Você precisa ser ADM para acessar essa rota!');

      this.router.navigate(['/home']);

    }

    /* INICIALIZA O METODO SEMPRE QUE O COMPONENT TEMA FOR CHAMADO */
    this.findAllTemas();

  }

  ajustar() {
    if(window.document.URL != '/home') {
      window.document.querySelector('.botao-postagem')?.setAttribute('style', 'display: block !important;');
      window.document.querySelector('.botao-postagem')?.setAttribute('style', 'justify-content: center !important;');
      window.document.querySelector('.botao-postagem')?.setAttribute('style', 'align-items: center !important;');

    }

  }

  /* CADASTRA UM NOVO TEMA NA BASE DE DADOS */
  cadastrar() {
    /* CHAMA A CLASSE TemaService CRIADA ANTERIORMENTE, ONDE CONTEM OS METODOS COM OS ENDPOINTS PARA MANIPULAR A API */
    /* RECEBE COMO PARAMETRO O OBJETO Tema CONVERSER ESSE DADO TypeScript em um Objeto JavaScrit(JSON)*/
    this.temaService.portTema(this.tema).subscribe((resp: Tema) => {
      /* PEGA ESSE Objeto(JSON) E INSERE DENTRO DO Objeto tema, INSERINDO ESSE DADOS NA BASE DE DADOS */
      this.tema = resp;
      /* RETORNA UMA RESPOSTA AO USUARIO */
      this.alertas.showAlertSuccess('Tema cadastrado com sucesso.');
      /* SEMPRE QUE HOUVER UM NOVO DADO, ATUALIZE MINHA LISTA DE TEMAS */
      this.findAllTemas();
      /* INSTANCIA UM NOVO Objeto Tema, PARA QUE POSSA SER ZERADO OS DADOS ANTERIORES E COMECAR UM NOVO CADASTRO */
      this.tema = new Tema();

    })

  }

  /* TRAZ TODOS OS DADOS CONTIDOS NA TABELA */
  /* CHAMA A CLASSE TemaService E POR ELE NOS DA ACESSO AO METODO DE findAllTema() CRIANDO DENTRO DELE ONDE NOS POSSIBILITA ESTAR TRAZENDO TODOS OS DADOS CONTADOS NA TABELA TEMA */
  /* CONVERTE ESSE DADOS TypeScript em um Objeto JavaScrip INSERINDO ESSE DADOS DENTRO DO ATRIBUTO listaTema, ARRAY RESPOSAVEL POR ARMAZENAR TODOS OS DADOS DA TELA TEMA */
  /* COM ESSE DADOS EM MAOS, CONSEGUIMOS POR MEIO DE UM FOR(*ngFor) NO HTML, LISTA TODOS ESSE DADOS */
  findAllTemas() {
    this.temaService.findAllTema().subscribe((resp: Tema[]) => {
      /* ARMAZENA OS DADOS VINDOS DA TABELA TEMA, DENTRO DA VARIAVEL QUE E UM ARRAY listaTema[] */
      this.listaTema = resp;

    })

  }

}
