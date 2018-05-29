import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


/*
  Generated class for the QuestionarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuestionarioProvider {

  private url : string = 'http://localhost:8080/questionario/';
  private urlRespostas : string = 'http://localhost:8080/resposta/'
  constructor(public http: HttpClient) {
  }

  getQuestionarios(){
    return this.http.get(this.url);
  }

  getQuestionariosRespondidos(){
    return this.http.get(this.urlRespostas);
  }

  enviaRespostas(respostas){
    return this.http.post(this.urlRespostas, respostas);
  }

}
