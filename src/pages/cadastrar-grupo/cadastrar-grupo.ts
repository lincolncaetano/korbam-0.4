import {NavController, LoadingController, NavParams, ToastController} from 'ionic-angular';
import {Component} from '@angular/core';

import {UsuarioService} from '../../services/UsuarioService';

import {UsuarioGrupoPage} from '../usuario-grupo/usuario-grupo';

@Component({
  templateUrl: 'cadastrar-grupo.html',
  providers: [UsuarioService],
})
export class CadastrarGrupoPage {


  public grupoCad :any;
  public grupoResp :any;
  public grupoEdit :any;
  private submitted: Boolean;
  private idUsuarioLogado: number;

  constructor(
    public nav: NavController,
    public service: UsuarioService,
    public navParams: NavParams,
    public loadingController: LoadingController,
    public toastCtrl: ToastController ) {


    this.grupoCad = {};

    this.submitted = false;
    this.idUsuarioLogado = navParams.get("idUsuarioLogado");

    this.grupoEdit = navParams.get("grupoEdit");
    if(this.grupoEdit != null){
      this.grupoCad = this.grupoEdit ;
    }

  }

  funcaoPraAceitarSubmeterForm(form){
    this.submitted = true;

    if (form.valid) {

      let loading = this.loadingController.create({
        spinner: 'dots'
      });

      loading.present();

      this.grupoCad.usuario = {id: this.idUsuarioLogado};

      setTimeout(() => {
        this.nav.push(UsuarioGrupoPage, {grupo: this.grupoCad});
      }, 500);

      setTimeout(() => {
        loading.dismiss();
      }, 1000);


    }else{

      console.log(form.titulo);

      let toast = this.toastCtrl.create({
        message: 'Mmmm, buttered toast',
        duration: 2000,
        position: 'top'
      });

      toast.present(toast);
    }

  }

  logError(err){

  }

  loginComplete(){

  }

  funcaoPraRedirecionarPraOutroLugar(){
    this.nav.pop();
  }

}
