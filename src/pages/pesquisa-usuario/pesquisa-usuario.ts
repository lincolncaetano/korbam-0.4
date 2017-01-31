import {NavController} from 'ionic-angular';
import {Component} from '@angular/core';

import {UsuarioService} from '../../services/UsuarioService';
import {PerfilPage} from '../perfil/perfil';


@Component({
  templateUrl: 'pesquisa-usuario.html',
  providers: [UsuarioService],
})
export class PesquisaUsuarioPage {

  public searchQuery: String;
  public items: any;

  constructor(
    public nav: NavController,
    public service: UsuarioService) {

    this.searchQuery = '';
  }

  onKey(){
    var q = this.searchQuery;
    if(q.trim() == '') { return this.items }

    this.service.pesquisaUsuario(q)
    .subscribe(data => this.items = data);
  }

  goUsuario(idUsuario){
    this.nav.push(PerfilPage, {idUsuario: idUsuario});
  }
}
