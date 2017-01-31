import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

import {EventoService} from '../../services/EventoService';



@Component({
  selector: 'page-check-modal',
  templateUrl: 'check-modal.html',
  providers: [EventoService]
})
export class CheckModal {

  private listaChecklist: Object[] = [];
  private itemCheck: any = '';
  private eventoCad : any;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public params: NavParams,
    public service: EventoService) {

    }

  ionViewDidLoad() {
    this.listaChecklist =[];

    this.eventoCad = this.params.get('eventoSel').evento;
    this.service.pesquisaCheckListPorEvento(this.eventoCad.id)
    .subscribe(
      data => this.retornoListaChecklist(data),
      err => this.logError(err),
      () => this.buscaComplete()
    );
  }

  retornoListaChecklist(data){
    if(data != false){
      this.listaChecklist = data;
    }
  }

  logError(err){
    console.log(err);
  }

  buscaComplete(){

  }

  salvaCheck(){
    let check = {
      descricao : this.itemCheck,
      evento : this.params.get('eventoSel').evento,
      status : 'F'
    }

    this.service.salvarChecklist(check)
    .subscribe(
      data => this.retornoSalvarCheck(data),
      err => this.logError(err),
      () => this.salvarCheckComplete()
    );
  }

  retornoSalvarCheck(data){
    if(data != false){
      this.listaChecklist.push(data);
    }
    console.log(data);
  }

  salvarCheckComplete(){
    this.itemCheck = '';
  }

  excluirCheck(check, index){
    this.service.detelaChecklist(check.id)
    .subscribe(
      data => this.retornoExcluirCheck(data, index),
      err => this.logError(err),
      () => this.excluirCheckComplete()
    );
  }

  retornoExcluirCheck(data, index){
    if(data == true){
      this.listaChecklist.splice(index, 1);
    }
  }

  excluirCheckComplete(){

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  getShowBtnAdd(){
    if(this.itemCheck != ''){
      return true;
    }else{
      return false;
    }
  }

}
