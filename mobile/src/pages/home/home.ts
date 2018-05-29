import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private userProvider: UserProvider) {

  }

  ionViewCanEnter() {
    if(! this.userProvider.isLoggedIn()){
      this.navCtrl.setRoot(LoginPage);
    }
  }

}
