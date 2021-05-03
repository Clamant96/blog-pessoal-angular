import {HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';
import { EntrarComponent } from './entrar/entrar.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RodapeComponent,
    EntrarComponent,
    CadastrarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    /* IMPORTA O FormsModule ==> PARA QUE SE POSSA UTILIZAR O ngModel DENTRO DO HTML */
    FormsModule
  ],
  /* CRIAMOS ESSE PROVIDER, PARA FAZER COM QUE O ANGULAR CONSIGA MAPEGAR A ENTRUTURA DA PAGINA, E NAO SE PERDER EM ACESSOS DE ANCORAMENTO PARA NAVEGACAO DA APLICACAO */
  providers: [{
      provide: LocationStrategy,
      useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
