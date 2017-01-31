import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import moment from 'moment'

import {CadastrarGrupoPage} from '../cadastrar-grupo/cadastrar-grupo';
import {CadastrarEventoPage} from '../cadastrar-evento/cadastrar-evento';
import {EventoPage} from '../evento/evento';

import {GrupoService} from '../../services/GrupoService';
import {UserData} from '../../services/user-data';


@Component({
  templateUrl: 'grupo.html',
  providers: [GrupoService, UserData]
})
export class GrupoPage {


  public grupoRe: any;
  public nome: any;
  public segGrupo: any;

  public idUsuarioLogado: any;
  public idGrupo: any;
  public adminGrupo: any;

  public listaUsuarios: any;
  public isAdmin: any;
  public eventosGrupo: any;

  public usuarioEventoRe: any;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public service: GrupoService,
    public userData: UserData) {


    this.segGrupo = "eventos";
    this.isAdmin = false;

    this.idGrupo = navParams.data.idGrupo;

    this.service.pesquisaGrupoPorId(this.idGrupo)
    .subscribe(
      data => this.grupoRe = data,
      err => this.logError(err),
      () => this.buscaGrupoComplete()
    );

  }

  buscaGrupoComplete(){
    if(this.grupoRe != false){

      this.nome = this.grupoRe.nome;
      this.listaUsuarios = this.grupoRe.listaUsuario;
      this.adminGrupo = this.grupoRe.usuario;
      if(this.grupoRe.listaEvento != null){
        this.eventosGrupo = this.grupoRe.listaEvento;
        for(let evento of this.eventosGrupo){
          let selectedDate = moment(evento.dtInicio, moment.ISO_8601);
          evento.momento = selectedDate;
        }
      }else{
        this.eventosGrupo = {};
      }

      this.userData.getId().then(
        (id) => {
          if(this.adminGrupo.id == id){
            this.isAdmin = true;
          }
      });
    }
  }

  logError(err){
    console.log(err);
  }

  editarGrupo(){
    this.userData.getId().then(
      (id) => {
        this.nav.push(CadastrarGrupoPage, {idUsuarioLogado: id, grupoEdit : this.grupoRe});
    });
  }

  cadastrarEvento() {
    this.userData.getId().then(
      (id) => {
        this.nav.push(CadastrarEventoPage, {idUsuarioLogado: id, grupo : this.grupoRe});
    });
  }

  abrirEvento(item){


    this.userData.getId().then(
      (id) => {
        this.idUsuarioLogado = id;
        this.service.pesquisaUsuarioEvento(this.idUsuarioLogado, item.id)
        .subscribe(
          data => this.usuarioEventoRe = data,
          err => this.logError(err),
          () => this.buscaUsuarioEventoComplete()
        );
    });


  }

  buscaUsuarioEventoComplete(){
    if(this.usuarioEventoRe != false && this.usuarioEventoRe != true){
      this.nav.push(EventoPage, {idUsuarioLogado: this.idUsuarioLogado, usuarioEvento : this.usuarioEventoRe});
    }else if(this.usuarioEventoRe == true){
      
    }
  }


}
