import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

import {AmizadeService} from '../../services/AmizadeService';
import {EventoService} from '../../services/EventoService';

/*
  Generated class for the CompartilharmentoModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-compartilharmento-modal',
  templateUrl: 'compartilharmento-modal.html',
  providers: [AmizadeService, EventoService]
})
export class CompartilharmentoModal {

  itemsCad: string[];

  public searchQuery : string  = '';
  public items : any;
  public listaResp : any;
  public eventoCad : any;
  public eventoResp : any;
  private idUsuarioLog : any;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public params: NavParams,
    public service: AmizadeService,
    public eventoService: EventoService) {


      this.eventoCad = this.params.get('eventoSel').evento;
      this.idUsuarioLog = this.params.get('idUsuarioLogado');

    }

  ionViewDidEnter() {
    console.log('Hello CompartilharmentoModal Page');
    this.initializeItems();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  initializeItems() {
    this.itemsCad = [];

    this.eventoService.buscaListaUsuarioPorEvento(this.params.get('eventoSel').evento.id)
    .subscribe(
      data => this.listaUsuarioEventoRetorno(data),
      err => this.logError(err),
      () => this.listaUsuarioEventoComplete()
    );


    this.service.listaAmigos(this.params.get('idUsuarioLogado'))
    .subscribe(
      data => this.listaResp = data,
      err => this.logError(err),
      () => this.loginComplete()
    );

  }

  listaUsuarioEventoRetorno(data){
    if(data != false){
      this.itemsCad = data;
    }
  }

  listaUsuarioEventoComplete(){

  }


  logError(err){

  }

  loginComplete() {

    if(this.listaResp != false){
      for (var user of this.listaResp) {
        user.checked = false;
      }
      //this.items = this.listaResp;
    }

    if(this.eventoCad.listaUsuario != null){
      for (var user of this.eventoCad.listaUsuario) {
        for (var userAux of this.listaResp) {
          if(user.id == userAux.id){
            userAux.checked = true;
          }
        }
      }
    }
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    //this.initializeItems();

    // set q to the value of the searchbar
    var q = ev.target.value;

    // if the value is an empty string don't filter the items
    if (q == null || q.trim() == '') {
      this.items = [];
      return false;
    }

    this.items = this.listaResp.filter((v) => {

      if (v.username.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

  adicionarPessoaEvento(usuario){
    let eventoUsuario = {
      id: { idUsuario: usuario.id, idEvento: this.params.get('eventoSel').evento.id},
      evento : this.params.get('eventoSel').evento,
      usuario : usuario,
      status : 'P'
    };

    this.eventoService.salvarUsuarioEvento(eventoUsuario)
    .subscribe(
      data => this.retornoAdicionarPessoaEvento(data),
      err => this.logError(err),
      () => this.adicionarPessoaEventoComplete()
    );
  }

  retornoAdicionarPessoaEvento(data){
    if(data != false){
      this.itemsCad.push(data);
    }
  }

  adicionarPessoaEventoComplete(){
    this.items = [];
  }

  excluirPessoaEvento(pe, index){

    this.eventoService.deteleUsuarioEvento(pe.usuario.id,this.params.get('eventoSel').evento.id)
    .subscribe(
      data => this.retornoExcluirPessoaEvento(data, index),
      err => this.logError(err),
      () => this.excluirPessoaEventoComplete()
    );
  }

  retornoExcluirPessoaEvento(data,index){
    if(data == true){
      this.itemsCad.splice(index, 1);
    }
  }
  excluirPessoaEventoComplete(){

  }


}
