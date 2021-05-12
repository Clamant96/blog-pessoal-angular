import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  usuario: User = new User();
  idUsuario: number;
  confirmarSenha: string;
  tipoUsuario: string;

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alertas: AlertasService

  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    if(environment.token == '') {
      this.router.navigate(['/login']);

    }

    this.idUsuario = this.route.snapshot.params['id'];
    this.findByIdUsuario(this.idUsuario);

  }

  findByIdUsuario(id: number) {
    this.authService.findByIdUsuario(id).subscribe((resp: User) => {
      this.usuario = resp;

    })

  }

  /* VERIFICA SE A SENHA CRIADA E MESMA DE CONFIRME SENHA */
  confirmeSenha(event: any) {
    /* ATRIBUI O DADO VINDO DO HTML POR MEIO DO [(ngModel)] A VARIAVEL CRIADA */
    this.confirmarSenha = event.target.value;

  }

  tipoUser(event: any) {
    /* ATRIBUI O DADO VINDO DO HTML POR MEIO DO [(ngModel)] A VARIAVEL CRIADA */
    this.tipoUsuario = event.target.value;

  }

  atualizar() {
    /* INSERE O TIPO DE USUARIO SELECIONADO, AO ATRIBUTO NA BASE DE DADOS */
    this.usuario.tipo = this.tipoUsuario;

    /* VERIFICA SE AS SENHAS DIGITADAS, SAO IGUAIS */
    if(this.usuario.senha != this.confirmarSenha) {
      /* INFORMA UM ALERTA AO USUARIO */
      this.alertas.showAlertDanger('As senhas estao incorretas!');

    }else {
      /* CHAMA O METODO CADASTRAR CRIADO NO NOSSO SERVICE */
      /* subscribe ==> CONVERTE UM ARQUIVO TypeScript EM UM ARQUIVO JSON/JavaScript */
      /* ARMAZENA OS DADOS DENTRO DE UM ATRIBUTO TEMPORARIO CHAMADO resp */
      this.authService.cadastrar(this.usuario).subscribe((resp: User) => {
        /* POR SUA VEZ ATRIBUI OS DADOS DE resp AO USUARIO DENTRO DA BASE DE DADOS*/
        this.usuario = resp;
        /* INFORMA UM ALERTA AO USUARIO DE CADASTRO BEM SUCEDIDO */
        this.alertas.showAlertSuccess('Dados atualizados com sucesso, faça login novamente!');

        environment.token = ''; // ARMAZENA TOKEN PARA QUE POSSAMOS VALIDAR O ACESSO DO USUARIO NO SISTEMA
        environment.nome = '';
        environment.foto = '';
        environment.id = 0;

        /* REDIRECIONA O USUARIO A PAGINA DE login APOS O CADASTRO TER SIDO REALIZADO COM SUCESSO */
        this.router.navigate(['/login']);

        /* CASO OCORRA UMA MENSAGEM DE ERRO, MOSTRA ESSE ERRO NO CONSOLE */
      }, erro => {
        console.log(erro.status);
        console.log(erro);

      });

    }

  }

  /* ANIMACAO */
  botaoCadastrarAnimacaoOver(){
    window.document.querySelector('#botaoCadastrar')?.setAttribute('style', 'background-color: #c3c3c3 !important;')

  }

  /* ANIMACAO */
  botaoCadastrarAnimacaoOut(){
    window.document.querySelector('#botaoCadastrar')?.setAttribute('style', 'background-color: var(--background-color-button) !important;')

  }



}
