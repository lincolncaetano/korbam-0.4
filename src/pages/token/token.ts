import {NavController} from 'ionic-angular';
import {Component} from '@angular/core';

import {UsuarioService} from '../../services/UsuarioService';

@Component({
  templateUrl: 'token.html',
  providers: [UsuarioService],
})
export class TokenPage {

  public name: String;
  public submitted : any;
  public login : any;
  public data1 : any;
  public usuario : any;


  constructor(
    public nav: NavController,
    public service: UsuarioService) {

    this.usuario = {};
    this.submitted = false;
  }

  doSalvar(form){

    if(form.valid){

        var usuarioCad = {
          email: this.usuario.email,
          token: this.usuario.token,
          password: this.usuario.password
        };

        this.service.alteraSenha(usuarioCad)
        .subscribe(
          data => this.data1 = data,
          err => this.logError(err),
          () => console.log('Authentication Complete')
        );
    }
  }


  logError(err){
    console.log(err);
  }
}
