import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  postagem: Postagem = new Postagem();
  listaDePostagens: Postagem[];

  tema: Tema = new Tema();
  listaDeTemas: Tema[];
  idTema: number;

  usuario: User = new User();
  idUsuario = environment.id;

  key = 'data';
  reverse = true;

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService,
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

    /* SEMPRE QUE O COMPONENT HOME E INICIALLIZADO, OS TEMAS SAO LISTADOS AUTOMATICAMENTE POR MEIO DO METODO findAllTemas() */
    this.findAllTemas();
    this.findAllByPostagens();
    //this.findByIdUsuario();

  }

  /* TRAZ TODOS OS TEMAS CONTIDOS NA BASE DE DADOS */
  findAllTemas() {
    this.temaService.findAllTema().subscribe((resp: Tema[]) => {
      this.listaDeTemas = resp;

    })

  }

  /* TRAZ UM TEMA POR MEIO DO ID */
  findByIdTema() {
    this.temaService.findByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp;

    })

  }

  /*postPostagem() {
    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp;

    })

  }*/

  /* INSERE OS DADOS NA BASE DE DEDOS */
  publicar() {
    /* ACESSA O OBJETO TEMA(ID), E DENTRO DELE INSERE O DADO VINDO DA OPCAO ESCOLHIDA PELO USUARIO */
    this.tema.id = this.idTema;
    /* INSERE O ID DE TEMA DENTRO DE POSTAGEM(TEMA) */
    this.postagem.tema = this.tema;

    /* ACESSAR O OBJETO USUARIO(ID), E DENTRO DELE INSERE O DADO VINDO DO ENVIROMENT */
    this.usuario.id = this.idUsuario;
    /* INSERE O ID DE USUARIO DENTRO DE POSTAGEM(USUARIO/AUTOR) */
    this.postagem.autor = this.usuario;

    /* CHAMA O METODO DE PostagemService E REALIZA UM NOVO (POST), AGORA COM TODOS OS DADOS INSERIDOS */
    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp;

      this.alertas.showAlertSuccess('Postagem realizada com sucesso!');

      /* INSTANCIA UM NOVO OBJETO POSTAGEM PARA LIMPAR OS CAMPOS */
      this.postagem = new Postagem();

      /* TODA VEZ QUE INSERIR UM NOVO DADO NA BASE DE DADOS, IRA ATUALIZAR A VARIVEL listaDePostagem PARA SEMPRE MANTELA COMS OS DADOS MAIS ATUAIS */
      this.findAllByPostagens();

    })

  }

  /* LISTANDO TODAS AS POSTAGENS CONTIDAS NA BASE DE DADOS */
  findAllByPostagens() {
    this.postagemService.findAllByPostagens().subscribe((resp: Postagem[]) => {
      this.listaDePostagens = resp;

    })

  }

  /* TRAZ UM UNICO USUARIO POR MEIO DO ID */
  findByIdUsuario() {
    this.authService.findByIdUsuario(this.idUsuario).subscribe((resp: User) => {
      this.usuario = resp;

    })

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
