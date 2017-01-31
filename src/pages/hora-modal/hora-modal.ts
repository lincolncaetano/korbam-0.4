import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import moment from 'moment';

import {EventoService} from '../../services/EventoService';


@Component({
  selector: 'page-hora-modal',
  templateUrl: 'hora-modal.html',
  providers: [EventoService]
})
export class HoraModal {

  private eventoCad : any;
  public eventoResp: any;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public params: NavParams,
    public service: EventoService) {

      this.eventoCad = this.params.get('eventoSel').evento;
      let selectedDate = moment(this.eventoCad.dtInicio, 'YYYY-MM-DD');
      this.eventoCad.dtInicioString = selectedDate.format('YYYY-MM-DD');
    }

  ionViewDidLoad() {
    console.log('Hello HoraModal Page');
  }

  dismiss() {

    console.log(this.eventoCad);

    this.service.salvarEvento(this.eventoCad)
    .subscribe(
      data => this.eventoResp = data,
      err => this.logError(err),
      () => this.salvarEventoComplete()
    );

  }

  salvarEventoComplete(){
    if(this.eventoResp != false){
      this.viewCtrl.dismiss();
    }
  }

  logError(err){
    console.log(err);
  }

}
