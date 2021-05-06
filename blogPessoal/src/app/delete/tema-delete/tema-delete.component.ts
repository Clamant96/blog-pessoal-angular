import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  /* INSTANCIA UM NOVO OBJETO TEMA, POIS ESTAMOS TRATANDO DE DADOS DE TEMA */
  tema: Tema = new Tema();
  /* CRIA UM ATRIBUTO GLOBAL AFIM DE ARMAZENAR O DADO DE FORMA MAIS SIMPLES */
  idTema: number;

  /* INJETA AS DEPENDENCIAS NECESSARIAS */
  constructor(
    private temaService: TemaService,
    private router: Router,
    /* RESPOSAVEL POR CAPTURAR PARAMETROS CONTIDOS DENTRO DA URL */
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    /* CASO NAO SEJA IDENTIFICADO O TOKEN DO USUARIO, O MESMO E REDIRECIONADO A TELA DE LOGIN */
    if(environment.token == '') {
      this.router.navigate(['/login']);

    }

    /* CAPITURA O PARAMETRO CONTIDO NA URL E ARMAZENA DENTRO DA VARIAVEL ID */
    this.idTema = this.route.snapshot.params['id'];
    /* INSERE A VARIAVEL ID DENTRO DO METODO RESPOSAVEL POR TRAZER O OBJETO DENTRO DE TEMA POR MEIO DO ID INFORMADO */
    this.findByIdTema(this.idTema)
  }

  /* REPOSAVEL POR RECEBER COMO PARAMETRO ID ESPECIFICO E ACESSAR O METODO CONTIDO DENTRO DE TemaService ACESSANDO O METODO findByIdTema */
  /* APARTIR DESSE METODO E POSSIVEL REALIZAR IDENTIFICACAO DO ITEM LISTADO DENTRO DE TEMA */
  /* E ARMAZENA-LO DENTRO DO OBJETO TEMA, E DESSA FORMA CONSEGUIMOS ACESSAR E MANIPULAR ESSES DADOS DENTRO DO FRONT-END */
  findByIdTema(id: number) {
    this.temaService.findByIdTema(id).subscribe((resp: Tema) => {
      this.tema = resp;

    })

  }

  /* APAGA UM DADO ESPECIFICO, NO QUAL O USUARIO DESEJA EXCLUIR AO CLICAR NO BOTAO */
  /* METODO RESPSAVEL POR ACESSAR O TemaSerive ONDE CHAMARA A FUNCAO deletetema QUE RECEBE COMO PARAMENTRO O ID CONTIDO NA URL */
  /* O DADO E CONERTIDO E EXCLUIDO DO SISTEMA, RETORNANDO AO USUARIO UMA MENSAGEM DE EXCLUSAO REALIZADA COM SUCESSO */
  apagar() {
    this.temaService.deleteTema(this.idTema).subscribe(() => {
      alert('Item excluido com sucesso!');

      this.router.navigate(['/tema']);

    })

  }

}
