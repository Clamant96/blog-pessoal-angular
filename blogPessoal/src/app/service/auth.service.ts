import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /* CONTRI O CAMINHO PARA O SERVIDOR */
  serverPort = environment.server + environment.port

  constructor(
    private http: HttpClient

  ) { }

  entrar(userLogin: UserLogin): Observable<UserLogin> {
    
    return this.http.post<UserLogin>(`${this.serverPort}/usuarios/logar`, userLogin);
  }

  /* Observable<> ==> Verifica se os dados inseridos no metodo, sao do tipo User */
  cadastrar(user: User): Observable<User> {

    /* O METODO RETORNA O TIPO User, E INSERE O DADO  */
    return this.http.post<User>(`${this.serverPort}/usuarios/cadastrar`, user);
  }

  /* RETONA UM VALOR true OU false CASO O TOKEN ESTA PREENCHIDO, CASO ESTEJA VAZIO RETONA false, CASO ESTEJA COM DADOS RETONA true*/
  logado() {
    /* CRIA UMA VARIAVEL BOOLEAN */
    let ok: boolean = false;

    /* CRIA UMA CONDIZIONAL, CASO MEU TOKEN QUE VEM DA MINHA VARIAVEL BLOBAL, ESTEJA COM ALGUM DADO, ATRIBUA 'true' A MINHA VARIAVEL 'ok' */
    if(environment.token != '') {
      /* ATRIBUI 'true' A VARAIVEL 'ok' */
      ok = true;

    }

    /* RETORNA O VALOR DA VARIAVEL */
    return ok;
  }
}
