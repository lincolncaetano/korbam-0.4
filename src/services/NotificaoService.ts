import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

import {ServerSettings} from './ServerSettings';

@Injectable()
export class NotificaoService {

  private headers: Headers;


  constructor(public http:Http) {

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  static get parameters(){
     return [[Http]];
  }

  buscaNotificacoes(idUsuario): any{
    var url = ServerSettings.URL_SERVER+'/buscaNotificacoes/'+idUsuario;
    return this.http.get(url).map(res => res.json());
  }

  atualizaNotificacao(listaNotificacao): any {
      var url = ServerSettings.URL_SERVER+'/atualizaNotificacao';
      return this.http.post(url, JSON.stringify({listaNotif : listaNotificacao}), {headers: this.headers}).map(res => res.json());
  }

  pesquisaUsuarioEvento(idUsuario,idEvento): any{
    var url = ServerSettings.URL_SERVER+'/pesquisaUsuarioEventoPorId/'+idUsuario+'/'+idEvento;
    return this.http.get(url).map(res => res.json());
  }

}
