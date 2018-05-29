import { LoginPage } from './../login/login';
import { RespostaPage } from './../resposta/resposta';
import { QuestionarioProvider } from './../../providers/questionario/questionario';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-questionario',
  templateUrl: 'questionario.html'
})
export class QuestionarioPage {
  private questionarios = null;
  private questionariosRespondidos = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private questionarioProvider: QuestionarioProvider, private userProvider: UserProvider) {
    this.questionariosRespondidos = [];

  }
  
  ngOnInit(){
    this.questionarioProvider.getQuestionarios().subscribe( items => {
      this.questionarios = items;
    }, err => {
      console.error(err);
    });

    this.questionarioProvider.getQuestionariosRespondidos().subscribe( items => {
      this.questionariosRespondidos = items;
      console.log(this.questionariosRespondidos);
      console.log(this.questionarios);
    }, err => {
      console.error(err);
    })
  }

  itemTapped(event, item) {
    this.navCtrl.push(RespostaPage, item);
  }

  buscaQuestionarioRespondido(id){
    this.questionariosRespondidos.find(function(element){
      return element.id_questionario == id;
    })
  }

  ionViewCanEnter() {
    if(! this.userProvider.isLoggedIn()){
      this.navCtrl.setRoot(LoginPage);
    }
  }
}
