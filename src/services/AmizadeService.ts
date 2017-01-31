import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {ServerSettings} from './ServerSettings';
import 'rxjs/add/operator/map';

@Injectable()
export class AmizadeService {

  private headers: Headers;


  constructor(public http:Http) {

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  static get parameters(){
     return [[Http]];
  }

  pesquisaUsuarioPorId(id): any{
    var url = ServerSettings.URL_SERVER+'/pesquisaUsuarioPorId/'+id;
    return this.http.get(url).map(res => res.json());
  }

  solicitaAmizade(amizade): any {
    var url = ServerSettings.URL_SERVER+'/solicitaAmizade';
    return this.http.post(url, JSON.stringify({amz : amizade}), {headers: this.headers}).map(res => res.json());
  }

  listaAmigos(id): any{
    var url = ServerSettings.URL_SERVER+'/listaAmigos/'+id;
    return this.http.get(url).map(res => res.json());
  }

  salvarEvento(evento): any {
    var url = ServerSettings.URL_SERVER+'/salvarEvento';
    return this.http.post(url, JSON.stringify({evento : evento}), {headers: this.headers}).map(res => res.json());
  }

  buscaAmizadeId(idUsuario,idUsuarioSolicitado): any{
    var url = ServerSettings.URL_SERVER+'/buscaAmizadeId/'+idUsuario+'/'+idUsuarioSolicitado;
    return this.http.get(url).map(res => res.json());
  }

  cancelarAmizade(amizade): any {
    var url = ServerSettings.URL_SERVER+'/cancelarAmizade'+'/'+amizade.id.idUsuario+'/'+amizade.id.idUsuarioSolicitato;
    return this.http.delete(url,{headers: this.headers}).map(res => res.json());
  }

}
