import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {LocalNotifications} from 'ionic-native';
import {Component} from '@angular/core';

import {AmizadeService} from '../../services/AmizadeService';

import moment from 'moment'

@Component({
  templateUrl: 'usuario-evento.html',
  providers: [AmizadeService],
})
export class UsuarioEventoPage {

  public namePage : any = "UsuarioEventoPage";
  public searchQuery : string;
  public items : any;
  public listaResp : any;
  public eventoCad : any;
  public eventoResp : any;


  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public service: AmizadeService,
    public loadingController: LoadingController) {

    this.searchQuery = '';
    this.eventoCad = navParams.get('evento');
    this.initializeItems();
  }

  loginComplete() {

    if(this.listaResp != false){
      for (var user of this.listaResp) {
        user.checked = false;
      }
      this.items = this.listaResp;
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

  logError(err){

  }

  initializeItems(){
    this.service.listaAmigos(this.eventoCad.usuario.id)
    .subscribe(
      data => this.listaResp = data,
      err => this.logError(err),
      () => this.loginComplete()
    );
  }


  getItems(searchbar) {
    // Reset items back to all of the items
    //this.initializeItems();

    // set q to the value of the searchbar
    var q = searchbar.value;

    // if the value is an empty string don't filter the items
    if (q.trim() == '') {
      this.items = this.listaResp;
      return false;
    }

    this.items = this.listaResp.filter((v) => {

      if (v.username.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

  change(usuario){

    for (var user of this.listaResp) {
        if(user.id == usuario.id){
          if(user.checked == true){
            user.checked = false;
          }else{
            user.checked = true
          }
        }
    }

  }

  salvarEvento(){



    var lista = [];
    var cont = 0;
    var adicionado = false;
    var eventoUsuario;


    for (var user of this.listaResp) {
      eventoUsuario = {};
      adicionado = false;

      if(user.checked){
        if(this.eventoCad.listaUsuario != null){
          for (var eventoUser of this.eventoCad.listaUsuario) {
            if(eventoUser.id.idUsuario == user.id){
              adicionado = true;
              eventoUsuario = eventoUser;
              break;
            }
          }
        }
        if(!adicionado){
          eventoUsuario = {
            usuario : user,
            status : 'P'
          };
          lista[cont] = eventoUsuario;
        }

        cont++;
      }
    }

    this.eventoCad.listaUsuario = lista;

    this.service.salvarEvento(this.eventoCad)
    .subscribe(
      data => this.eventoResp = data,
      err => this.logEventoError(err),
      () => this.salvarEventoComplete()
    );

    this.salvarEventoComplete();
  }

  logEventoError(err){
    console.log(err);
  }

  salvarEventoComplete(){

    let dateAlarme0 = moment(this.eventoCad.dtInicioString+" "+this.eventoCad.hrInicial, 'YYYY-MM-DD HH:mm');
    let dateAlarme1 = this.configuraAlerta(this.eventoCad.lembrete1);
    let dateAlarme2 = this.configuraAlerta(this.eventoCad.lembrete2);

    let msgAlerta1 = this.configuraMsgAlerta(this.eventoCad.lembrete1);
    let msgAlerta2 = this.configuraMsgAlerta(this.eventoCad.lembrete2);

    var id0 = parseInt(this.eventoResp.id+"0");
    var id1 = parseInt(this.eventoResp.id+"1");
    var id2 = parseInt(this.eventoResp.id+"2");

    LocalNotifications.schedule({
       id: id0,
       text: "O evento" + this.eventoCad.titulo + ' acabou de começar',
       badge: 1,
       at: dateAlarme0.toDate(),
       sound: 'file://beep.caf'
    });

    LocalNotifications.schedule({
       id: id1,
       text: msgAlerta1,
       badge: 1,
       at: dateAlarme1.toDate(),
       sound: 'file://beep.caf'
    });

    LocalNotifications.schedule({
       id: id2,
       text: msgAlerta2,
       badge: 1,
       at: dateAlarme2.toDate(),
       sound: 'file://beep.caf'
    });

    this.nav.popToRoot();


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

  isDisabled(item){
    if(this.eventoCad.listaUsuario != null){
      for (var user of this.eventoCad.listaUsuario) {
        if(item.id == user.id){
          return true;
        }
      }
    }
  }

}
