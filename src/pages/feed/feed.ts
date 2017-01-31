import {NavController, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';

import {UsuarioService} from '../../services/UsuarioService';
import {PerfilUsuarioPage} from '../perfil-usuario/perfil-usuario';


@Component({
  templateUrl: 'feed.html',
  providers: [UsuarioService],
})
export class FeedPage {

  public searchQuery: String;
  public items: any;
  public retorno: any;
  private idUsuarioLogado : any;

  constructor(
    public nav: NavController,
    public service: UsuarioService,
    public navParams: NavParams) {

    this.searchQuery = '';

    this.idUsuarioLogado = navParams.data;
  }

  onKey(event){
    var q = event.target.value;
    if(q != ''){
      this.service.pesquisaUsuario(q)
      .subscribe(
        data => this.retorno = data,
        err => this.logError(err),
        () => this.pesquisaComplete()
      );
    }else{
      this.items = [];
    }

  }

  pesquisaComplete(){
    if(this.retorno != null){
      this.items = this.retorno;
    }else{
      this.items = [];
    }
  }

  logError(err){
    console.log(err)
  }

  goUsuario(idUsuario){
    this.nav.push(PerfilUsuarioPage, {idUsuario: idUsuario, idUsuarioLogado: this.idUsuarioLogado});
  }
}
