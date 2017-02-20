import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import {LocalNotifications} from 'ionic-native';
import moment from 'moment';

import {EventoService} from '../../services/EventoService';
import {GrupoService} from '../../services/GrupoService';


@Component({
  selector: 'page-hora-modal',
  templateUrl: 'hora-modal.html',
  providers: [EventoService,GrupoService]
})
export class HoraModal {

  private eventoCad : any;
  public eventoResp: any;
  private retorno : any;
  private meusGrupoTarefa : any;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public params: NavParams,
    public service: EventoService,
    public grupoService: GrupoService) {

      this.eventoCad = this.params.get('eventoSel').evento;
      let selectedDate = moment(this.eventoCad.dtInicio, 'YYYY-MM-DD');
      this.eventoCad.dtInicioString = selectedDate.format('YYYY-MM-DD');

      console.log(this.eventoCad);
      if(this.eventoCad.grupoTarefa == null){
        this.eventoCad.grupoTarefa = {};
      }

    }

  ionViewDidLoad() {
    console.log('Hello HoraModal Page');

    this.grupoService.pesquisaGrupoTarefaPorUsuario(this.eventoCad.usuario.id)
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

  dismiss() {
    this.service.salvarEvento(this.eventoCad)
    .subscribe(
      data => this.eventoResp = data,
      err => this.logError(err),
      () => this.salvarEventoComplete()
    );

  }

  salvarEventoComplete(){
    if(this.eventoResp != false){
      this.configuraLembrete();
      this.viewCtrl.dismiss();
    }
  }

  logError(err){
    console.log(err);
  }

  configuraLembrete(){

    let dateAlarme0 = moment(this.eventoCad.dtInicioString+" "+this.eventoCad.hrInicial, 'YYYY-MM-DD HH:mm');
    let dateAlarme1 = this.configuraAlerta(this.eventoCad.lembrete1);
    let dateAlarme2 = this.configuraAlerta(this.eventoCad.lembrete2);

    let msgAlerta1 = this.configuraMsgAlerta(this.eventoCad.lembrete1);
    let msgAlerta2 = this.configuraMsgAlerta(this.eventoCad.lembrete2);

    var id0 = parseInt(this.eventoResp.id+"0");
    var id1 = parseInt(this.eventoResp.id+"1");
    var id2 = parseInt(this.eventoResp.id+"2");

    if(dateAlarme0 != null){
      LocalNotifications.schedule({
         id: id0,
         text: "O evento" + this.eventoCad.titulo + ' acabou de começar',
         at: dateAlarme0.toDate(),
         every: this.eventoCad.repetir,
         led: 'FF0000',
         sound: 'file://beep.caf'
      });
    }

    if(this.eventoCad.lembrete1 != null){
      LocalNotifications.schedule({
         id: id1,
         text: msgAlerta1,
         at: dateAlarme1.toDate(),
         every: this.eventoCad.repetir,
         led: 'FF0000',
         sound: 'file://beep.caf'
      });
    }
    if(this.eventoCad.lembrete2 != null){
      LocalNotifications.schedule({
         id: id2,
         text: msgAlerta2,
         at: dateAlarme2.toDate(),
         every: this.eventoCad.repetir,
         led: 'FF0000',
         sound: 'file://beep.caf'
      });
    }


  }

  configuraAlerta(codLembrete){

    if(codLembrete == 1){
      return moment(this.eventoCad.dtInicioString+" "+this.eventoCad.hrInicial, 'YYYY-MM-DD HH:mm').subtract(2, "minutes");
    }else if(codLembrete == 2){
      return moment(this.eventoCad.dtInicioString+" "+this.eventoCad.hrInicial, 'YYYY-MM-DD HH:mm').subtract(1, "hours");
    }else if(codLembrete == 3){
      return moment(this.eventoCad.dtInicioString+" "+this.eventoCad.hrInicial, 'YYYY-MM-DD HH:mm').subtract(2, "hours");
    }else if(codLembrete == 4){
      return moment(this.eventoCad.dtInicioString+" "+this.eventoCad.hrInicial, 'YYYY-MM-DD HH:mm').subtract(4, "hours");
    }else if(codLembrete == 5){
      return moment(this.eventoCad.dtInicioString+" "+this.eventoCad.hrInicial, 'YYYY-MM-DD HH:mm').subtract(8, "hours");
    }else if(codLembrete == 6){
      return moment(this.eventoCad.dtInicioString+" "+this.eventoCad.hrInicial, 'YYYY-MM-DD HH:mm').subtract(12, "hours");
    }else if(codLembrete == 7){
      return moment(this.eventoCad.dtInicioString+" "+this.eventoCad.hrInicial, 'YYYY-MM-DD HH:mm').subtract(1, "days");
    }else if(codLembrete == 8){
      return moment(this.eventoCad.dtInicioString+" "+this.eventoCad.hrInicial, 'YYYY-MM-DD HH:mm').subtract(2, "days");
    }

  }

  configuraMsgAlerta(codLembrete){

    if(codLembrete == 1){
      return "Faltam 30 minutos para o evento " + this.eventoCad.titulo;
    }else if(codLembrete == 2){
      return "Falta 1 hora para o evento " + this.eventoCad.titulo;
    }else if(codLembrete == 3){
      return "Faltam 2 horas para o evento " + this.eventoCad.titulo;
    }else if(codLembrete == 4){
      return "Faltam 4 horas para o evento " + this.eventoCad.titulo;
    }else if(codLembrete == 5){
      return "Faltam 8 horas para o evento " + this.eventoCad.titulo;
    }else if(codLembrete == 6){
      return "Faltam 12 horas para o evento " + this.eventoCad.titulo;
    }else if(codLembrete == 7){
      return "Falta 1 dia para o evento " + this.eventoCad.titulo;
    }else if(codLembrete == 8){
      return "Faltam 2 dias para o evento " + this.eventoCad.titulo;
    }

  }

}
