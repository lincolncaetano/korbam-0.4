import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {ServerSettings} from './ServerSettings';
import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {

  private headers: Headers;

  constructor(public http:Http) {

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }


  loginUsuario(usuarioLog): any {

        var url = ServerSettings.URL_SERVER+'/login';
        return this.http.post(url, JSON.stringify({usr : usuarioLog}), {headers: this.headers}).map(res => res.json());

    }

    cadastrarUsuario(usuarioCad): any {

        //var url = 'http://localhost:8080/korbam/cadastrarUsuario';
        var url = ServerSettings.URL_SERVER+'/cadastrarUsuario';
        return this.http.post(url, JSON.stringify({usr : usuarioCad}), {headers: this.headers}).map(res => res.json());
    }

    editarUsuario(usuarioCad): any {
        var url = ServerSettings.URL_SERVER+'/editarUsuario';
        return this.http.post(url, JSON.stringify({usr : usuarioCad}), {headers: this.headers}).map(res => res.json());
    }

    validaEmail(email): any{
      //var url = 'http://localhost:8080/korbam/validaEmail/'+email;
      var url = ServerSettings.URL_SERVER+'/validaEmail'+email;
      return this.http.get(url).map(res => res.json());
    }

    enviarToken(usuario): any{
      //var url = 'http://localhost:8080/korbam/enviarToken';
      var url = ServerSettings.URL_SERVER+'/enviarToken';
      return this.http.post(url, JSON.stringify({usr : usuario}), {headers: this.headers}).map(res => res.json());
    }

    alteraSenha(usuarioCad): any{

      //var url = 'http://localhost:8080/korbam/alteraSenha';
      var url = ServerSettings.URL_SERVER+'/alteraSenha';
      return this.http.post(url, JSON.stringify({usr : usuarioCad}), {headers: this.headers}).map(res => res.json());
    }

    pesquisaUsuario(username): any{
      //var url = 'http://localhost:8080/korbam/pesquisaUsuario/'+username;
      var url = ServerSettings.URL_SERVER+'/pesquisaUsuario/'+username;
      return this.http.get(url).map(res => res.json());
    }

    pesquisaUsuarioPorId(id): any{
      //var url = 'http://localhost:8080/korbam/pesquisaUsuarioPorId/'+id;
      var url = ServerSettings.URL_SERVER+'/pesquisaUsuarioPorId/'+id;
      return this.http.get(url).map(res => res.json());
    }

    salvarEvento(evento): any {

        var url = ServerSettings.URL_SERVER+'/salvarEvento';
        return this.http.post(url, JSON.stringify({evento : evento}), {headers: this.headers}).map(res => res.json());
    }

    pesquisaEventoPorUsuario(id): any{
      var url = ServerSettings.URL_SERVER+'/pesquisaEventoPorUsuario/'+id;
      return this.http.get(url).map(res => res.json());
    }

    buscaEventoUsuarioPorUsuarioData(id, data): any{
      var url = ServerSettings.URL_SERVER+'/buscaEventoUsuarioPorUsuarioData/'+id+"/"+data;
      return this.http.get(url).map(res => res.json());
    }

    buscaUsuarioEventoPendente(id): any{
      var url = ServerSettings.URL_SERVER+'/buscaUsuarioEventoPendente/'+id;
      return this.http.get(url).map(res => res.json());
    }

    cadastrarTokenDevice(usuarioDevice): any {
      var url = ServerSettings.URL_SERVER+'/cadastrarTokenDevice';
      return this.http.post(url, JSON.stringify({userDevice : usuarioDevice}), {headers: this.headers}).map(res => res.json());
    }

    buscaTodosUsuarioEventoPorIdUsuario(id): any{
      var url = ServerSettings.URL_SERVER+'/buscaTodosUsuarioEventoPorIdUsuario/'+id;
      return this.http.get(url).map(res => res.json());
    }

    cadastrarGrupoEvento(gpEvento): any {
      var url = ServerSettings.URL_SERVER+'/salvarGrupoEvento';
      return this.http.post(url, JSON.stringify({grupoEvento : gpEvento}), {headers: this.headers}).map(res => res.json());
    }

    detelaPorToken(token): any {
        var url = ServerSettings.URL_SERVER+'/detelaPorToken'+'/'+token;
        return this.http.delete(url,{headers: this.headers}).map(res => res.json());
    }

}
