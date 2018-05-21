import { RespostaService } from './../../services/resposta.service';
import { ThfTableColumn } from '@totvs/thf-ui/components/thf-table';
import { QuestionarioService } from './../../services/questionario.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-questionario-respondido',
  templateUrl: './questionario-respondido.component.html',
  providers: [RespostaService, QuestionarioService]
})
export class QuestionarioRespondidoComponent implements OnInit {

  private questionarioId : number;
  private usuarioId : number;
  private questionarioRespondidoColunas : Array<ThfTableColumn>
  private respostas : Array<any>;
  private nomeQuestionario : string;
  private nomeUsuario : string;

  constructor(private route: ActivatedRoute, private respostaService : RespostaService, private questionarioService : QuestionarioService) {
    this.route.params.subscribe( params => {
      this.questionarioId = params['questionarioId'];
      this.usuarioId = params['usuarioId'];

    }); 

  }

  ngOnInit() {
    this.questionarioRespondidoColunas = this.respostaService.getQuestionarioRespondidoColumns();
    this.respostaService.getRespostaQuestionario(this.questionarioId, this.usuarioId).subscribe( items => {
      this.respostas = items;
    }, err => {
      console.log(err);
    });
    this.questionarioService.getItem(this.questionarioId).subscribe( item => {
      this.nomeQuestionario = item[0].nome;
    });
  }

}
