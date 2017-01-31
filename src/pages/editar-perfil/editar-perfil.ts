import {NavController, ActionSheetController} from 'ionic-angular';
import {Component} from '@angular/core';
import { App } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Camera} from 'ionic-native';
import {LocalNotifications} from 'ionic-native';
import moment from 'moment'

import {UsuarioService} from '../../services/UsuarioService';
import {UserData} from '../../services/user-data';

@Component({
  templateUrl: 'editar-perfil.html'
})
export class EditarPerfilPage {

  public usuarioCad: any;
  public idUsuarioLogado: any;
  public token: any;
  public retorno: any;
  public usuario: any;
  public local: Storage = new Storage();
  public namePage : any = "EditarPerfilPage";
  public atualizarPerfil = false;
  public fotoAux :any;


  constructor(
    public nav: NavController,
    public actionSheetCtrl: ActionSheetController,
    public service: UsuarioService,
    private app: App,
    public userData: UserData) {

    this.usuarioCad = {};

    this.userData.getId().then(
      (data) => {
        this.idUsuarioLogado = data;
        this.service.pesquisaUsuarioPorId(this.idUsuarioLogado)
        .subscribe(
          data => this.retorno = data,
          err => this.logError(err),
          () => this.pesquisaComplete()
        );
      }
    );


    this.local.get('tokenDevice').then(token => {
      this.token = token;
    }).catch(error => {
      console.log(error);
    });

  }

  logError(err){
    console.log(err);
  }

  pesquisaComplete(){
    if(this.retorno != false){
      this.usuarioCad = this.retorno;
      if(this.usuarioCad.dataNascimento != null){
        let selectedDate = moment(this.usuarioCad.dataNascimento, 'YYYY-MM-DD');
        this.usuarioCad.dataNascimentoString = selectedDate.format('YYYY-MM-DD');
      }
    }
  }

  salvarUsuario(){
    this.service.editarUsuario(this.usuarioCad)
    .subscribe(
      data => this.usuario = data,
      err => this.logError(err),
      () => this.completeCad()
    );
  }

  completeCad(){
    this.atualizarPerfil = true;
    this.nav.pop();
  }


  presentActionSheet() {
   let actionSheet = this.actionSheetCtrl.create({
     buttons: [
       {
         text: 'Tirar Foto',
         handler: () => {
           this.openCamera();
         }
       },
       {
         text: 'Escolher Foto',
         handler: () => {
           this.selectFromGallery();
         }
       },
       {
         text: 'Cancel',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
     ]
   });

   actionSheet.present();
 }

 selectFromGallery() {
    var options = {
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.DATA_URL,
      encodingType: Camera.EncodingType.PNG,
      allowEdit: true,
      targetWidth: 560,
      targetHeight: 560,
      correctOrientation: false
    };
    Camera.getPicture(options).then((imageData) => {
      //this.usuarioCad.fotoProfileBase64 = 'data:image/jpeg;base64,' + imageData;
      this.usuarioCad.fotoProfileBase64 = imageData;
      //this.photoSelected = true;
      //this.photoTaken = false;
    }, (err) => {
      // Handle error
    });
  }

  openCamera() {
    var options = {
      sourceType: Camera.PictureSourceType.CAMERA,
      destinationType: Camera.DestinationType.DATA_URL,
      encodingType: Camera.EncodingType.PNG,
      allowEdit: true,
      targetWidth: 560,
      targetHeight: 560,
      correctOrientation: false
    };
    Camera.getPicture(options).then((imageData) => {
      //this.usuarioCad.fotoProfileBase64 = 'data:image/jpeg;base64,' + imageData;
      this.usuarioCad.fotoProfileBase64 = imageData;
      //this.photoTaken = true;
      //this.photoSelected = false;
    }, (err) => {
      // Handle error
    });
  }

  logout(){
    this.service.detelaPorToken(this.token)
    .subscribe(
      data => this.retorno = data,
      err => this.logError(err),
      () => this.logoutComplete()
    );

  }

  logoutComplete(){
    this.local.clear();
    const root = this.app.getRootNav();
    root.popToRoot();
    LocalNotifications.cancelAll();
  }

}
