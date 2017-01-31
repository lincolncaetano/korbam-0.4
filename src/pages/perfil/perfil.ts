import {NavController, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';
import moment from 'moment'

import {UsuarioService} from '../../services/UsuarioService';
import {EditarPerfilPage} from '../editar-perfil/editar-perfil';

import {UserData} from '../../services/user-data';

@Component({
  templateUrl: 'perfil.html'
})
export class PerfilPage {

  public idUsuarioLogado : any;
  public idUsuario : number;
  public usuario : any;
  private retorno: any;


  constructor(
    public nav: NavController,
    public service: UsuarioService,
    public navParams: NavParams,
    public userData: UserData) {

    this.usuario = {};
    this.init();
  }

  init(){

    this.userData.getId().then(
      (data) => {
        this.idUsuarioLogado = data;
          this.service.pesquisaUsuarioPorId(this.idUsuarioLogado)
          .subscribe(
            data => this.retorno = data,
            err => this.logError(err),
            () => this.pesquisaComplete()
          );
      }
    );
  }

  ionViewDidEnter() {
    if(this.nav.last().instance.atualizarPerfil){
      this.usuario = {};
      this.init();
    }
  }

  logError(err){
    console.log(err);
  }

  pesquisaComplete(){
    if(this.retorno != false){
      this.usuario = this.retorno;
      if(this.usuario.dataNascimento != null){
        let selectedDate = moment(this.usuario.dataNascimento, 'YYYY-MM-DD');
        this.usuario.dataNascimentoString = selectedDate.format('YYYY-MM-DD');
        this.usuario.idade = moment().diff(selectedDate, 'years');
      }
    }
  }


  logout(){
    //this.local.clear();
    this.nav.pop();
  }


  editar(){
    this.nav.push(EditarPerfilPage, {idUsuarioLogado: this.usuario.id});
  }
}
