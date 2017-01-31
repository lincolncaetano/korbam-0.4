import {NavController, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';

import {CadastrarGrupoPage} from '../cadastrar-grupo/cadastrar-grupo';
import {GrupoPage} from '../grupo/grupo';

import {GrupoService} from '../../services/GrupoService';

@Component({
  templateUrl: 'lista-grupos.html',
  providers: [GrupoService]
})
export class ListaGruposPage {

  private idUsuarioLogado : any;
  private retorno : any;
  public meusGrupos : any;


  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public service: GrupoService) {

    this.idUsuarioLogado = navParams.data;

    this.init();
  }

  ionViewDidEnter() {
    if(this.nav.last().instance.namePage == "UsuarioGrupoPage"){
      this.init();
    }
  }

  init(){
    this.service.buscaGruposIdUsuario(this.idUsuarioLogado)
    .subscribe(
      data => this.retorno = data,
      err => this.logError(err),
      () => this.buscaGrupoComplete()
    );
  }


  criarGrupo(){
    this.nav.push(CadastrarGrupoPage, {idUsuarioLogado: this.idUsuarioLogado});
  }

  abreGrupo(item){
    this.nav.push(GrupoPage, {idGrupo: item.id});
  }

  logError(err){
    console.log(err);
  }
  buscaGrupoComplete(){
    if(this.retorno != false){
      this.meusGrupos = this.retorno;
    }else{
      this.meusGrupos = [];
    }
  }

  doRefresh(refresher) {

    this.service.buscaGruposIdUsuario(this.idUsuarioLogado)
    .subscribe(
      data => this.retorno = data,
      err => this.logError(err),
      () => this.buscaGrupoComplete()
    );

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}
