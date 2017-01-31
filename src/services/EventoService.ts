import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {ServerSettings} from './ServerSettings';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class EventoService {

  private headers: Headers;


  constructor(public http:Http) {

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  static get parameters(){
     return [[Http]];
  }

  salvarEvento(evento): any {
    var url = ServerSettings.URL_SERVER+'/salvarEvento';
    return this.http.post(url, JSON.stringify({evento : evento}), {headers: this.headers}).map(res => res.json());
  }

  buscaListaUsuarioPorEvento(idEvento): any{
    var url = ServerSettings.URL_SERVER+'/buscaListaUsuarioPorEvento/'+idEvento;
    return this.http.get(url).map(res => res.json());
  }

  salvarUsuarioEvento(usuarioEvento): any {
      var url = ServerSettings.URL_SERVER+'/salvarUsuarioEvento';
      return this.http.post(url, JSON.stringify({usuarioEvento : usuarioEvento}), {headers: this.headers}).map(res => res.json());
  }

  deteleUsuarioEvento(idUsuario, idEvento): any {
      var url = ServerSettings.URL_SERVER+'/deteleUsuarioEvento'+'/'+idUsuario+'/'+idEvento;
      return this.http.delete(url,{headers: this.headers}).map(res => res.json());
  }

  detelaEventoEvento(idEvento): any {
      var url = ServerSettings.URL_SERVER+'/detelaEvento'+'/'+idEvento;
      return this.http.delete(url,{headers: this.headers}).map(res => res.json());
  }

  salvarChecklist(checklist): any {
      var url = ServerSettings.URL_SERVER+'/salvarChecklist';
      return this.http.post(url, JSON.stringify({check : checklist}), {headers: this.headers}).map(res => res.json());
  }

  detelaChecklist(idCheck): any {
      var url = ServerSettings.URL_SERVER+'/detelaChecklist'+'/'+idCheck;
      return this.http.delete(url,{headers: this.headers}).map(res => res.json());
  }

  pesquisaCheckListPorEvento(idEvento): any{
    var url = ServerSettings.URL_SERVER+'/pesquisaCheckListPorEvento/'+idEvento;
    return this.http.get(url).map(res => res.json());
  }

}
