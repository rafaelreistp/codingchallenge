import { PerguntaDissertativa } from './../../models/pergunta.dissertativa';
import { PerguntaAlternativa } from './../../models/pergunta.alternativa';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operator/map';

/*
  Generated class for the PerguntaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PerguntaProvider {

  private url : string = 'http://localhost:8080/pergunta/'
  constructor(public http: HttpClient) {
    console.log('Hello PerguntaProvider Provider');
  }

  getPerguntas(idQuestionario){
    return this.http.get(this.url+idQuestionario).map( (item: Array<any>) => {
      let retorno : Array<any> = [];
      item.forEach(element => {
        if(element.tipo == 'Dissertativa'){
          retorno.push(new PerguntaDissertativa({id: element.id, pergunta: element.pergunta}));
        } else{
          retorno.push(new PerguntaAlternativa({id: element.id, pergunta: element.pergunta}));
        }
      });
      return retorno;
    })
  }

}
