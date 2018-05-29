import { QuestionarioProvider } from './../../providers/questionario/questionario';
import { PerguntaControlService } from './../../providers/pergunta/pergunta-control.service';
import { PerguntaPadrao } from './../../models/pergunta.padrao';
import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { ToastController, NavController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
 
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.html',
  providers: [ PerguntaControlService, QuestionarioProvider ]
})
export class DynamicFormComponent implements OnInit {
 
  @Input() questions: PerguntaPadrao<any>[] = [];
  form: FormGroup;
  payLoad = '';
 
  constructor(private qcs: PerguntaControlService, private questionarioProvider : QuestionarioProvider, private toastCtrl: ToastController, private navCtrl: NavController) {  }
 
  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }
 
  onSubmit() {
    this.questionarioProvider.enviaRespostas(this.form.value).subscribe( res => {
      this.mensagemResultado(true);
      console.log(res);
    }, err => {
      console.error(err);
    })
  }

  mensagemResultado(resultado:boolean){
    let toast;
    if(resultado){
      toast = this.toastCtrl.create({
        message: 'Respostas enviadas!',
        duration: 3000
      });
    }else{
      toast = this.toastCtrl.create({
        message: 'Falha ao enviar respostas!',
        duration: 3000
      });
    }
    toast.present();
    this.navCtrl.setRoot(HomePage);
  }
}