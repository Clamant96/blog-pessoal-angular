import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  usuario: User = new User();
  confirmarSenha: string;
  tipoUsuario: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  /* QUANDO MINHA PAGINA INICIALIZAR FACA ISSO */
  ngOnInit() {
    // FAZ COM QUE O SCROLL SEMPRE FIQUE NO TOPO DA TELA AO INICIALIZAR A APLICACAO
    window.scroll(0,0)
  }

  confirmeSenha(event: any) {
    this.confirmarSenha = event.target.value;

  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value;

  }

  cadastrar() {
    this.usuario.tipo = this.tipoUsuario;

    if(this.usuario.senha != this.confirmarSenha) {
      alert('As senhas estao incorretas!');

    }else {
      this.authService.cadastrar(this.usuario).subscribe((resp: User) => {
        this.usuario = resp;
        this.router.navigate(['/login']);

        alert('Usuario cadastrado com sucesso!');
      });
      
    }

  }

}
