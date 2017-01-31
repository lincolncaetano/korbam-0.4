import {NavController, NavParams, PopoverController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Component} from '@angular/core';
import moment from 'moment'

import {AmizadeService} from '../../services/AmizadeService';
import {PopoverPage} from './popover';

@Component({
  templateUrl: 'perfil-usuario.html',
  providers: [AmizadeService]
})
export class PerfilUsuarioPage {

  public idUsuario : any;
  public idUsuarioLogado : any;
  public usuario : any;
  public usrRe : any;
  public retorno : any;
  public amzRe : any;
  public username : String;
  public local: Storage = new Storage();
  public cancelarSolicitacao: boolean;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public service: AmizadeService,
    public popOver: PopoverController) {


    this.usuario = {};
    this.idUsuario = navParams.get('idUsuario');
    this.idUsuarioLogado = navParams.get('idUsuarioLogado');

    this.service.pesquisaUsuarioPorId(this.idUsuario)
    .subscribe(
      data => this.retorno = data,
      err => this.logError(err),
      () => this.loginComplete()
    );

  }

  loginComplete(){
    if(this.retorno != false){
      this.usuario = this.retorno;
      if(this.usuario.dataNascimento != null){
        let selectedDate = moment(this.usuario.dataNascimento, 'YYYY-MM-DD');
        this.usuario.dataNascimentoString = selectedDate.format('YYYY-MM-DD');
        this.usuario.idade = moment().diff(selectedDate, 'years');
      }
    }
  }

  amizadeComplete(amizade){
    if(amizade != false){
      if(amizade.id.idUsuario == this.idUsuarioLogado && amizade.status=='P'){
        this.cancelarSolicitacao = true;
      }
    }
  }

  solicitaAmizade(){

    var amizade = {
      id:{
        idUsuario: this.idUsuarioLogado,
        idUsuarioSolicitato:this.idUsuario
      },
      status: 'P'
    };

    this.service.solicitaAmizade(amizade)
    .subscribe(
      data => this.usrRe = data,
      err => this.logError(err),
      () => this.AmizadeComplete()
    );
  }

  logError(err){
    console.log(err);
  }

  AmizadeComplete(){

  }

  presentPopover(myEvent) {
    let popover = this.popOver.create(PopoverPage,{
      usuario : this.usuario,
      usuarioLogado: this.idUsuarioLogado,
      cancelarSolicitacao: this.cancelarSolicitacao
    });
    popover.present({
      ev: myEvent
    });
  }


  mostrarOpcoes(elemento) {
    var e = document.getElementById(elemento);
    if (e.style.display == 'block')
        e.style.display = 'none';
    else
        e.style.display = 'block';
  }
}
