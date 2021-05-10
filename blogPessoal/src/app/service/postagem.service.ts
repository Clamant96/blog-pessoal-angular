import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  endereco = environment.server + environment.port;

  /* IMPORTA O COMPONENTE QUE NOS DA APOSSIBILIDADE DE ACESSAR METODO DE HTTP (GTE, POST, PUT, DELETE) */
  constructor(
    private http: HttpClient

  ) { }

  /* CONFIGURA O Authorization PARA LIBERACAO DE ACESSO AO DEMAIS PAGINAS */
  autorizacao = {
    headers: new HttpHeaders().set('Authorization', environment.token)

  }

  findAllByPostagens(): Observable<Postagem[]> {

    return this.http.get<Postagem[]>(`${this.endereco}/postagens`, this.autorizacao);
  }

  findByIdPostagem(id: number): Observable<Postagem> {

    return this.http.get<Postagem>(`${this.endereco}/postagens/${id}`, this.autorizacao);
  }

  findByTituloPostagens(titulo: string): Observable<Postagem[]> {

    return this.http.get<Postagem[]>(`${this.endereco}/postagens/titulo/${titulo}`, this.autorizacao);
  }

  findByTextoPostagens(texto: string): Observable<Postagem[]> {

    return this.http.get<Postagem[]>(`${this.endereco}/postagens/texto/${texto}`, this.autorizacao);
  }

  postPostagem(postagem: Postagem): Observable<Postagem> {

    return this.http.post<Postagem>(`${this.endereco}/postagens`, postagem, this.autorizacao);
  }

  putPostagem(postagem: Postagem): Observable<Postagem> {

    return this.http.put<Postagem>(`${this.endereco}/postagens`, postagem, this.autorizacao);
  }

  deletePostagem(id: number) {

    return this.http.delete<Postagem>(`${this.endereco}/postagens/${id}`, this.autorizacao);
  }

}
