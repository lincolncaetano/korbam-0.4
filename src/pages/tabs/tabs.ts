import {NavParams} from 'ionic-angular';
import {Platform} from 'ionic-angular';
import {Component} from '@angular/core';

import {FeedPage} from '../feed/feed';
import {AgendaPage} from '../agenda/agenda';
import {PerfilPage} from '../perfil/perfil';
import {NotificacoesPage} from '../notificacoes/notificacoes';
import {ListaGruposPage} from '../lista-grupos/lista-grupos';

import {NotificaoService} from '../../services/NotificaoService';
import {UserData} from '../../services/user-data';

@Component({
	template:
	'<ion-content>' +
	'</ion-content>',
})
class TabIconPage {
	isAndroid: boolean = false;
	idUsuarioLogado : any;

	constructor(platform: Platform,public service: NotificaoService) {
		this.isAndroid = platform.is('android');
	}

	onPageWillEnter() {
		document.getElementById('md-tabs-icon').style.display = "block";
		document.getElementById('md-only').style.display = "none";
	}
}

@Component({
	template:
	'<ion-tabs tabsPlacement="bottom" class="tabs-icon" selectedIndex="2">' +
  //  '<ion-tab tabIcon="home" [root]="tabOne" [rootParams]="idUsuarioLogado"></ion-tab>' +
    '<ion-tab tabIcon="search" [root]="tabTwo" [rootParams]="idUsuarioLogado" ></ion-tab>' +
		'<ion-tab tabIcon="notifications" (ionSelect)="chat()" [tabBadge]="nNotif" tabBadgeStyle="danger" [root]="tabFive" [rootParams]="idUsuarioLogado"></ion-tab>' +
		'<ion-tab tabIcon="calendar" [root]="tabFour" [rootParams]="idUsuarioLogado"></ion-tab>' +
		'<ion-tab tabIcon="people" [root]="tabSix" [rootParams]="idUsuarioLogado"></ion-tab>' +
		'<ion-tab tabIcon="person" [root]="tabThree" [rootParams]="idUsuarioLogado"></ion-tab>' +
	'</ion-tabs>',
	providers: [NotificaoService]
})
export class TabsPage {
	tabTwo = FeedPage;
	tabThree = PerfilPage;
	tabFour = AgendaPage;
	tabFive = NotificacoesPage;
	tabSix = ListaGruposPage;
	isAndroid: boolean = false;
	idUsuarioLogado : any;
	retorno : any;

	public nNotif = 0;

	constructor(
		platform: Platform,
		navParams :NavParams,
		public service: NotificaoService,
		public userData: UserData) {

		this.isAndroid = platform.is('android');
		//this.idUsuarioLogado = navParams.get("idUsuarioLogado");
		this.userData.getId().then(
			(id) => {

				this.idUsuarioLogado = id;
				this.service.buscaNotificacoes(this.idUsuarioLogado)
				.subscribe(
					data => this.retorno = data,
					err => this.logError(err),
					() => this.buscaNotifComplete()
				)
			}
		);

	}

	logError(err){
    console.log(err);
  }

	buscaNotifComplete(){
		if(this.retorno != false){
			for(let notificacao of this.retorno){
				if(notificacao.status == "P"){
					this.nNotif = this.nNotif + 1;
				}
			}
		}
	}

	chat(){
		this.nNotif = 0;
	}

	onPageWillLeave() {
		document.getElementById('md-tabs-icon').style.display = "none";
		document.getElementById('md-only').style.display = "block";
	}
}
