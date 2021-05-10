import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  postagem: Postagem = new Postagem();

  tema: Tema = new Tema();
  idTema: number;
  listaDeTemas: Tema[];

  constructor(
    private postagemService: PostagemService,
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    if(environment.token == '') {
      this.router.navigate(['/login']);

    }

    /* RECEBE O NOVO ID DE ACORDO COM A OPCAO ESCOLHIDA PELO USUARIO AO ATUALIZAR O DADO DE TEMA */
    this.idTema = this.route.snapshot.params['id'];
    this.findByIdPostagem(this.idTema);
    this.findAllTemas();

  }

  /* LOCALIZA UMA POSTAGEM POR MEIO DO ID */
  findByIdPostagem(id: number) {
    this.postagemService.findByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp;

    })

  }

  /* LOCALIZA UM TEMA POR MEIO DO ID */
  findByIdTema() {
    this.temaService.findByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp;

    })

  }

  /* TRAZ TODOS OS TEMAS CONTIDOS NA BASE DE DADOS */
  findAllTemas() {
    this.temaService.findAllTema().subscribe((resp: Tema[]) => {
      this.listaDeTemas = resp;

    })

  }

  /* ATUALIZA UMA POSTAGEM NA BASE DE DADOS */
  atualizar() {
    this.tema.id = this.idTema;
    this.postagem.tema = this.tema;

    this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp;

      alert('Postagem atualizada com sucesso!');

      this.router.navigate(['/home']);

    })

  }

}
