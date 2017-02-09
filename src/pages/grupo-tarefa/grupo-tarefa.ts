import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import {GrupoService} from '../../services/GrupoService';
import {UserData} from '../../services/user-data';

@Component({
  selector: 'page-grupo-tarefa',
  templateUrl: 'grupo-tarefa.html',
  providers: [GrupoService]
})
export class GrupoTarefaPage {

  private grupoTarefa: any;
  private retorno: any;
  private id: any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public userData: UserData,
    public viewCtrl: ViewController,
    private service: GrupoService) {
    this.grupoTarefa = {};

    this.userData.getId().then(
      (data) => this.id = data
    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GrupoTarefaPage');
  }

  dismiss(){
    this.grupoTarefa.usuario = {id: this.id};
    console.log(this.grupoTarefa);

    this.service.salvarGrupoTarefa(this.grupoTarefa)
    .subscribe(
      data => this.retorno = data,
      err => this.logError(err),
      () => this.buscaGrupoComplete()
    );
  }

  logError(err){
    console.log(err);
  }

  buscaGrupoComplete(){
    if(this.retorno != false){
        this.viewCtrl.dismiss();
    }
  }

}
