import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  /* CRIA UMA VARIAVEL PARA ARMAZENAR OS DADOS DO USARIO INSERIDOS DENTRO DAS VARIAVEIS GLOBAIS/HAMBIENTE */
  /* DESSA FORMA POR MEIO DE INTERPOLACAO, CONSEGUIMOS REFERENCIAR ESSE DADOS DENTRO DE NOSSO HTML {{nome_variavel}} */
  nome = environment.nome;
  foto = environment.foto;
  id = environment.id;

  constructor(
    private router: Router

  ) { }

  ngOnInit() {
  }

  /* METOD DE LOGOUT, RESPOSAVEL POR REDIRECIONAR O USUARIO A PAGINA DEMLOGIN */
  /* E ZERA OS DADOS CONTIDOS DENTRO DAS VARIAVEIS GLOBAIS, PARA QUE O USUARIO SEJA OBIRGADO A INFORMA-LAS NOVAMENTE POR MEIO DE UM NOVO ACESSO */
  sair() {
    this.router.navigate(['/login']);

    environment.token = '';
    environment.foto = '';
    environment.nome = '';
    environment.id = 0;

  }

}
