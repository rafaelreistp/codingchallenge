import { HomePage } from './../home/home';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Button } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private user = { email: '', senha: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, private userSerivce: UserProvider, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginSubmit(){
    this.userSerivce.autentica(this.user).subscribe( res => {
      console.log(res);
      if(res.auth){
        this.navCtrl.setRoot(HomePage);
      }else{
        this.presentAlert('Falha na autenticação.');
      }
    }, err => {
      this.presentAlert(err)
    })
  }

  presentAlert(err){
    let alert = this.alertCtrl.create({
      title: 'Falha na autenticação',
      subTitle: JSON.stringify(err),
      buttons: ['Ok']
    });
    alert.present();
  }

  cadastrar(){
    console.log('cadastrar');
  }

}
