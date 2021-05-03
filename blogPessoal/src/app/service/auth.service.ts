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
}
