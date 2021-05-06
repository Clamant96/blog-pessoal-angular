import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  /* INSTANCIA UM OBJETO TEMA, UM VEZ QUE ESTAMOS ESPERANDO EDITAR UM DADO DE TEMA */
  tema: Tema = new Tema();

  /* INJETA AS DEPENDENCIAS VINDO DO TemaService TRAZENDO OS METODOS CRIADOS E AS ROTAS DO OBJETO Router */
  constructor(
    private temaService: TemaService,
    private router: Router,
    /* RESPOSAVEL POR ACESSAR A URL E CAPITURAR O PARAMETRO QUE ESTA SENDO TRABALHADO NO MOMENTO */
    private route: ActivatedRoute

  ) { }

  /* SEMPRE QUE O COMPONENTE E CHAMADO, E EXECUTADO TUDO QUE ESTA AQUI DENTRO */
  ngOnInit() {
    /* REDIRECIONA O USUARIO PARA A TELA DE LOGIN, SEMPRE QUE O TOKEN NAO FOR IDENTIFICADO NA SESSAO */
    if(environment.token == '') {
      this.router.navigate(['/login']);

    }

    /* CAPITURA O PARAMENTRO DA URL E INSERE DETRO DO ATRIBUTO */
    let id = this.route.snapshot.params['id'];
    /* INSERE O VALOR COLETADO DA URL DENTRO DO METODO findByIdTema(id), QUE POR SUA VEZ RECEBE COMO PAREMTRO UM ID, DESSSA FORMA TRAZENDO OS DADOS DAQUELE ID EM ESPECIFICO */
    this.findByIdTema(id);

  }

  /* CRIA UM METODO QUE RECEBE COMO PARAMETRO UM ID VINDO DA URL */
  /* ACESSA O TemaService PARA TER ACESSO AO METODOS DE ACESSO HTTP CRIADOS */
  /* INFORMA O ID RECEBIDO DENTRO DO METODO DO SERVICE */
  /* CONVERTE ESSE DADO E O INSERE DENTRO DO OBJETO TEMA CRIADO */
  /* DESSA FORMA CONSEGUIMOS TER ACESSO AOS DADOS DENTRO DE NOSSO HTML */
  findByIdTema(id: number) {
    this.temaService.findByIdTema(id).subscribe((resp: Tema) => {
      this.tema = resp;

    })

  }

  /* METODO CHAMADO POR MEIO DE CLICK, ONDE TEM COMO FUNCAO, CHAMAR O METODO CRIADO DENTRO DE TemaCervice RECEBER COMO PAREMETRO O OBJETO ATUALIZADO DO USAURIO */
  /* CONVERTE ESSE DADO E ARMAZENA SEU VALOR DENTRO DA TABELA NOVAMENTE PARA QUE POSSAMOS APRESENTALA AO USUARIO */
  /* APOS ISSO RETORNAMOS AUTOMATICAMENTE A PAGINA DE TEMAS, COM OS DADOS JA ATUALIZADOS */
  atualizar() {
    this.temaService.putTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp;
      alert('Tema atualizado com sucesso!');

      this.router.navigate(['/tema']);

    })

  }

}
