import {NavController, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';

import {PerfilUsuarioPage} from '../perfil-usuario/perfil-usuario';
import {EventoPage} from '../evento/evento';

import {NotificaoService} from '../../services/NotificaoService';
import { UserData } from '../../services/user-data';

import moment from 'moment'

@Component({
  templateUrl: 'notificacoes.html',
  providers: [NotificaoService]
})

export class NotificacoesPage {

  private idUsuarioLogado : number;
  private retorno: any;
  public notificacoes: any;
  private notificacoesAtualizar: Object[] = [];

  private usuarioEventoRe: any;

  constructor(
    public nav: NavController,
    public service: NotificaoService,
    public navParams: NavParams,
    public userData: UserData) {

     this.idUsuarioLogado= navParams.data;
     this.notificacoes = [];

     this.service.buscaNotificacoes(this.idUsuarioLogado)
     .subscribe(
       data => this.retorno = data,
       err => this.logError(err),
       () => this.buscaNotifComplete()
     );
  }

  ionViewWillLeave(){
    for(let notificacao of this.notificacoes){
      if(notificacao.status == "P"){
        this.notificacoesAtualizar.push(notificacao);
      }
    }

    if(this.notificacoesAtualizar.length > 0){
      this.service.atualizaNotificacao(this.notificacoesAtualizar)
      .subscribe(
        data => this.retorno = data,
        err => this.logError(err),
        () => this.atualizacaoComplete()
      );
    }
  }

  atualizacaoComplete(){

  }

  buscaNotifComplete(){
    if(this.retorno != false){
      this.notificacoes = this.retorno;

      for(let notif of this.retorno){
        if(notif.evento != null){
          let selectedDate = moment(notif.evento.dtInicio, moment.ISO_8601);
          notif.evento.momento = selectedDate;
        }
      }
    }
  }

  logError(err){
    console.log(err);
  }

  goUsuario(idUsuario){
    this.nav.push(PerfilUsuarioPage, {idUsuario: idUsuario, idUsuarioLogado: this.idUsuarioLogado});
  }

  doRefresh(refresher) {
    this.service.buscaNotificacoes(this.idUsuarioLogado)
    .subscribe(
      data => this.retorno = data,
      err => this.logError(err),
      () => this.buscaNotifComplete()
    );

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }


  abrirEvento(item){

    this.service.pesquisaUsuarioEvento(this.idUsuarioLogado, item.evento.id)
    .subscribe(
      data => this.usuarioEventoRe = data,
      err => this.logError(err),
      () => this.buscaUsuarioEventoComplete()
    );
  }

  buscaUsuarioEventoComplete(){
    if(this.usuarioEventoRe != false && this.usuarioEventoRe != true){
      this.nav.push(EventoPage, {idUsuarioLogado: this.idUsuarioLogado, usuarioEvento : this.usuarioEventoRe});
    }else if(this.usuarioEventoRe == true){

    }
  }

}
