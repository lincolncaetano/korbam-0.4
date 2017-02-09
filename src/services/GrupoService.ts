import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

import {ServerSettings} from './ServerSettings';

@Injectable()
export class GrupoService {

  private headers: Headers;


  constructor(public http:Http) {

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  static get parameters(){
     return [[Http]];
  }

  buscaGruposIdUsuario(idUsuario): any{
    var url = ServerSettings.URL_SERVER+'/pesquisaGrupoPorUsuario/'+idUsuario;
    return this.http.get(url).map(res => res.json());
  }

  salvarGrupo(grupo): any {
    var url = ServerSettings.URL_SERVER+'/salvarGrupo';
    return this.http.post(url, JSON.stringify({grupo : grupo}), {headers: this.headers}).map(res => res.json());
  }

  listaAmigos(id): any{
    //var url = 'http://localhost:8080/korbam/listaAmigos/'+id;
    var url = ServerSettings.URL_SERVER+'/listaAmigos/'+id;
    return this.http.get(url).map(res => res.json());
  }

  pesquisaGrupoPorId(idGrupo): any{
    var url = ServerSettings.URL_SERVER+'/pesquisaGrupoPorId/'+idGrupo;
    return this.http.get(url).map(res => res.json());
  }

  pesquisaUsuarioEvento(idUsuario,idEvento): any{
    var url = ServerSettings.URL_SERVER+'/pesquisaUsuarioEventoPorId/'+idUsuario+'/'+idEvento;
    return this.http.get(url).map(res => res.json());
  }

  salvarGrupoTarefa(grupoTarefa): any {
    var url = ServerSettings.URL_SERVER+'/salvarGrupoTarefa';
    return this.http.post(url, JSON.stringify({grupoTarefa : grupoTarefa}), {headers: this.headers}).map(res => res.json());
  }

  pesquisaGrupoTarefaPorUsuario(idUsuario): any{
    var url = ServerSettings.URL_SERVER+'/pesquisaGrupoTarefaPorUsuario/'+idUsuario;
    return this.http.get(url).map(res => res.json());
  }

}
