import {NavController, NavParams, ModalController} from 'ionic-angular';
import {Component} from '@angular/core';

import {CadastrarGrupoPage} from '../cadastrar-grupo/cadastrar-grupo';
import {GrupoPage} from '../grupo/grupo';
import {GrupoTarefaPage} from '../grupo-tarefa/grupo-tarefa';

import {GrupoService} from '../../services/GrupoService';

@Component({
  templateUrl: 'lista-grupos.html',
  providers: [GrupoService]
})
export class ListaGruposPage {

  private idUsuarioLogado : any;
  private retorno : any;
  public meusGrupos : any;
  private meusGrupoTarefa : any;
  private grupoCategoria: String;


  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public service: GrupoService) {

    this.idUsuarioLogado = navParams.data;
    this.grupoCategoria = 'tarefas';
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


    this.service.pesquisaGrupoTarefaPorUsuario(this.idUsuarioLogado)
    .subscribe(
      data => this.retorno = data,
      err => this.logError(err),
      () => this.buscaGrupoTarefaComplete()
    );

  }

  buscaGrupoTarefaComplete(){
    if(this.retorno != false){
      this.meusGrupoTarefa = this.retorno;
    }else{
      this.meusGrupoTarefa = [];
    }
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

    this.init();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  openGrupoTarefaModal(grupoTarefa) {

    if(grupoTarefa != null){

      let eventJson = {grupoSel: grupoTarefa, idUsuarioLogado : this.idUsuarioLogado};
      let modal = this.modalCtrl.create(GrupoTarefaPage, eventJson);
      modal.present();

    }else{

      let modal = this.modalCtrl.create(GrupoTarefaPage);
      modal.present();
    }


  }

  openGrupoModal(grupo) {

    if(grupo != null){
      let eventJson = {grupoSel: grupo, idUsuarioLogado : this.idUsuarioLogado};
      let modal = this.modalCtrl.create(CadastrarGrupoPage, eventJson);
      modal.present();

    }else{
      let eventJson = {idUsuarioLogado : this.idUsuarioLogado};
      let modal = this.modalCtrl.create(CadastrarGrupoPage, eventJson);
      modal.present();
    }


  }

}
