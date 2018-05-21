import { ThfModalComponent } from '@totvs/thf-ui/components/thf-modal/thf-modal.component';
import { ThfModalAction } from '@totvs/thf-ui/components/thf-modal';
import { ThfSelectOption } from '@totvs/thf-ui/components/thf-field';
import { ThfPageAction } from '@totvs/thf-ui/components/thf-page';
import { PerguntaService } from './../../services/pergunta.service';
import { ThfTableColumn, ThfTableAction } from '@totvs/thf-ui/components/thf-table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pergunta',
  templateUrl: './pergunta.component.html',
  providers: [PerguntaService]
})
export class PerguntaComponent implements OnInit {

  private questionarioId : number;
  private perguntasColunas : Array<ThfTableColumn>;
  private perguntas : Array<any>;

  private pergunta;
  

  private readonly actions : Array<ThfPageAction> = [
    { label: "Nova Pergunta", action: 'adicionarPergunta', icon: 'thf-icon-plus' }
  ];

  private readonly tableActions : Array<ThfTableAction> = [
    { action: 'editarPergunta', label: 'Editar' },
    { action: 'excluir', label: 'Excluir'}
  ]

  private readonly tiposDePergunta : Array<ThfSelectOption> = [
    { label: 'Dissertativa', value: 1 },
    { label: 'Alternativa', value: 2}
  ]

  private readonly adicionarPerguntaPrimaryAction : ThfModalAction = {
    action: () => {
      this.pergunta.id_questionario = this.questionarioId;
      this.perguntaService.cadastra(this.pergunta).subscribe( res => {
          this.carregarPerguntas();
          this.adicionarPerguntaModal.close();
      }, err => {
        console.log(err);
      })
    },
    label: "Adicionar"
  }

  @ViewChild('adicionarPerguntaModal') adicionarPerguntaModal: ThfModalComponent;

  constructor(private route: ActivatedRoute, private perguntaService : PerguntaService) {
    this.pergunta = {};
    this.route.params.subscribe( params => {
      this.questionarioId = params['id'];
    });
   }

  ngOnInit() {
    console.log(this.questionarioId);
    this.perguntasColunas = this.perguntaService.getColumns();
    this.carregarPerguntas();
  }

  carregarPerguntas(){
    this.perguntaService.getItems(this.questionarioId).subscribe( items => {
      this.perguntas = items;
    }, err => {
      console.log(err);
    });
  }

  adicionarPergunta(item) {
    this.pergunta = {};
    this.adicionarPerguntaModal.open();
  }

  editarPergunta(item){
    this.pergunta = {id: item.id, tipo: item.tipo, pergunta: item.pergunta, id_questionario: item.id_questionario};
    this.adicionarPerguntaModal.open();
  }

  excluir(item){
    this.perguntaService.excluir(item).subscribe( res => {
      let index = this.perguntas.indexOf(item);
      if(index > -1){
        this.perguntas.splice(index,1);
      }  
    }, err => {
      console.log(err);
    });
  }
}
