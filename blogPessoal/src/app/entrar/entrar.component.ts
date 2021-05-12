import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  /* INSTANCIA UM NOVO USUARIO PARA SER LOGADO */
  userLogin: UserLogin = new UserLogin();

  constructor(
    /* INGETA AS DEPENDENCIAS PARA O COMPONENTE */
    private auth: AuthService,
    private router: Router,
    private alertar: AlertasService
  ) { }

  /* QUANDO MINHA PAGINA INICIALIZAR FACA ISSO */
  ngOnInit() {
    // FAZ COM QUE O SCROLL SEMPRE FIQUE NO TOPO DA TELA AO INICIALIZAR A APLICACAO
    window.scroll(0,0);
  }

  /* VALIDA O ACESSO DE UM USUARIO AO SISTEMA */
  entrar() {
    this.auth.entrar(this.userLogin).subscribe((resp: UserLogin) => {
      this.userLogin = resp;

      /* ARMAZENA OS DADOS COLETADOS A VARIAVEIS GLOBAIS */
      environment.token = this.userLogin.token; // ARMAZENA TOKEN PARA QUE POSSAMOS VALIDAR O ACESSO DO USUARIO NO SISTEMA
      environment.nome = this.userLogin.nome;
      environment.foto = this.userLogin.foto;
      environment.id = this.userLogin.id;

      console.log('Token: '+ environment.token);
      console.log('Nome: '+ environment.nome);
      console.log('Foto: '+ environment.foto);
      console.log('ID: '+ environment.id);

      /* REDIRECIONA O USUARIO CASO O LOGIN TENHA SIDO BEM SUCEDIDO */
      this.router.navigate(['/home']);

      /*  TRAZ UMA MENSAGEM DE ERRO, CASO OS DADOS NAO SEJAM VALIDOS*/
    }, erro => {
      if(erro.status == 500) {
        this.alertar.showAlertDanger('Usuario ou senha estao incorretos.');

      }
    })

  }

}
