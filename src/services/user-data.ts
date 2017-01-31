import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Injectable()
export class UserData {

  HAS_LOGGED_IN = 'hasLoggedIn';

  constructor(public events: Events, public storage: Storage) {}

  login(id) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setId(id);
    this.events.publish('user:login');
  }

  signup(id) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setId(id);
    this.events.publish('user:signup');
  }

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('idUsuario');
    this.events.publish('user:logout');
  }

  setId(id) {
    this.storage.set('idUsuario', id);
  }

  getId() {
    return this.storage.get('idUsuario').then((value) => {
      if(value == null){
        return null;
      }
      return value;
    });
  }

  // return a promise
  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }
}
