import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { EntrarComponent } from './entrar/entrar.component';
import { HomeComponent } from './home/home.component';
import { TemaComponent } from './tema/tema.component';

const routes: Routes = [
  /* ACESSO VAZIO */
  {
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full'
  },
  /* ============  */

  /* MINHA ROTAS DE PAGINACAO */
  {
    path: 'login', 
    component: EntrarComponent
  },
  {
    path: 'cadastrar', 
    component: CadastrarComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'tema',
    component: TemaComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
