import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  /* CRIAR UMA VARIAVEL PARA ARMAZENAR DINAMICAMENTE A ROTA DO SERVIDOR */
  serverPort = environment.server + environment.port;

  /* INJETA DEPENDENCIA DOS METODOS HTTP DENTRO DO SERVICE */
  constructor(
    private http: HttpClient

  ) { }

  /* CRIA UM TOKEN, PARA REALIZAR A AUTENTICACAO DO ENDPOINT, POR MEIO DO METODO Authorization, PASSANDO COMO PAREMTRO O TOKEN DO USUARIO LOGADO */
  autorizacao = {
    headers: new HttpHeaders().set('Authorization', environment.token)

  }

  /* CRIA UM METODO GET PARA PESQUISAR TODOS OS TEMAS E TRAZER EM FORMA DE ARRAY, UMA VEZ QUE ESTAMOS CHAMANDO TODOS OS DADOS */
  findAllTema(): Observable<Tema[]> {
    console.log('Minha autorizacao: '+ this.autorizacao.headers);

    /* RETORNAMOS O TOKEN */
    return this.http.get<Tema[]>(`${this.serverPort}/tema`, this.autorizacao);
  }

  /* CRIA UM METODO GET RESPOSAVEL POR PESQUISAR UMA TEMA POR ID ESPECIFICO */
  findByIdTema(id: number): Observable<Tema> {

    /* RETORNAMOS O OBJETO TEMA POR MEIO DE SEU ID */
    return this.http.get<Tema>(`${this.serverPort}/tema/${id}`, this.autorizacao);
  }

  /* CRIA UM METODO POST CADASTRAR UM DADO DENTRO DA BASE DE DADOS, NESSE CASO RECEBEMOS COMO PARATRO UM OBJETO, NO CASO Tema */
  portTema(tema: Tema): Observable<Tema> {

    /* RETORNAMOS O ATRIBUTO RECEBIDO DO USUARIO E O TOKEN */
    return this.http.post<Tema>(`${this.serverPort}/tema`, tema, this.autorizacao);
  }

  /* CRIA UM METODO PUT ATUALIZA UM DADO JA EXISTENTE INFORMADO PELO USUARIO */
  putTema(tema: Tema): Observable<Tema> {

    /* RETORNAMOS O DADO ATUALIZADO PARA USUARIO E O TOKEN */
    return this.http.put<Tema>(`${this.serverPort}/tema`, tema, this.autorizacao);
  }

  /* CRIA UM METODO DELETE QUE DELETA UM DADO INFORMADO PELO USUARIO, PASSANDO COMO PARAMTRO UM ID */
  deleteTema(id: number) {

    /* DELETA O DADO DA BASE DE DADOS */
    return this.http.delete(`${this.serverPort}/tema/${id}`, this.autorizacao);
  }

}
