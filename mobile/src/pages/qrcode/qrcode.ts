import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

/**
 * Generated class for the QrcodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html',
})
export class QrcodePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private qrScanner: QRScanner, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.scanQrCode();
  }

  scanQrCode(){
    this.qrScanner.prepare().then((status: QRScannerStatus) => {

      if(status.authorized){

        let scanSub = this.qrScanner.scan().subscribe( (text:string) => {
          console.log('Texto scaneado: ' + text);
          this.mensagemScaneado(text);
          this.qrScanner.hide();
          scanSub.unsubscribe();
          this.navCtrl.setRoot(HomePage);
        })

      } else if (status.denied){
        this.qrScanner.openSettings();
      } else {
        this.mensagemPermissao();
      }

    }).catch( e => console.log(e));
  }

  mensagemPermissao(){
    let toast;
    toast = this.toastCtrl.create({
      message: 'Permissão negada de uso da câmera',
      duration: 3000
    });
    toast.present();
    this.navCtrl.setRoot(HomePage);
  }

  mensagemScaneado(text : string){
    let toast;
    toast = this.toastCtrl.create({
      message: 'Texto scaneado: ' + text,
      duration: 3000
    });
    toast.present();
    this.navCtrl.setRoot(HomePage);
  }

}
