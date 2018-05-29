import { LoginPage } from './../login/login';
import { UserProvider } from './../../providers/user/user';
import { PerguntaProvider } from './../../providers/pergunta/pergunta';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RespostaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-resposta',
  templateUrl: 'resposta.html',
  providers: [PerguntaProvider]
})
export class RespostaPage {

  private idQuestionario : number;
  private nomeQuestionario : string;
  private perguntas : any[] = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, private perguntaProvider : PerguntaProvider, private userProvider: UserProvider) {
    this.idQuestionario = navParams.get("id");
    this.nomeQuestionario = navParams.get("nome");
    this.perguntaProvider.getPerguntas(this.idQuestionario).subscribe( items => {
      this.perguntas = items;
    }, err => {
      console.error(err);
    });
    
  }

  ionViewDidLoad() {
  }

  onSubmit(){
    console.log(this.perguntas);
  }

  ionViewCanEnter() {
    if(! this.userProvider.isLoggedIn()){
      this.navCtrl.setRoot(LoginPage);
    }
  }


}
