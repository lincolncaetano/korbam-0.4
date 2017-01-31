import {NavController} from 'ionic-angular';
import {Component} from '@angular/core';
import {TokenPage} from '../token/token';

import {UsuarioService} from '../../services/UsuarioService';

@Component({
  templateUrl: 'esqueceu-senha.html',
  providers: [UsuarioService],
})
export class EsqueceuSenhaPage {


  private nav : NavController;
  private service : UsuarioService;
  public signup : any;
  public signupForm : any;
  public submitted : any;
  public usuario : any;
  public data1 : any;

  constructor(
    nav: NavController,
    service: UsuarioService) {

    this.usuario = {};
    this.submitted = false;
  }

  doEnviar(form){

      if(form.valid){

        this.service.validaEmail(this.usuario.email)
        .subscribe(data => this.verificadoEmail(data));
      }
  }



  verificadoEmail(data){

    if(data){
      var usuarioCad = {
        email: this.usuario.email
      };

      this.service.enviarToken(usuarioCad)
      .subscribe(
        data => this.data1 = data,
        err => this.logError(err),
        () => console.log('Authentication Complete')
      );

      alert("Token enviado com sucesso!");
    }else{
      alert("Este e-mail não está registrado!");
    }
  }

  logError(err){
    console.log(err);
  }

  token() {
      this.nav.push(TokenPage);
  }
}
