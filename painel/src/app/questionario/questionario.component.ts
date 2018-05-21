import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ThfSelectOption  } from '@totvs/thf-ui/components/thf-field';
import { ThfModalAction } from '@totvs/thf-ui/components/thf-modal';
import { ThfModalComponent } from '@totvs/thf-ui/components/thf-modal/thf-modal.component';
import { ThfPageAction, ThfPageFilter } from '@totvs/thf-ui/components/thf-page';
import { ThfTableColumn, ThfTableAction } from '@totvs/thf-ui/components/thf-table';
import { QuestionarioService } from '../../services/questionario.service';



@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.component.html',
  providers: [QuestionarioService]
})
export class QuestionarioComponent implements OnInit {

  private questionarios : Array<any>;
  private questionariosFiltrados : Array<any>;
  private questionariosColunas : Array<ThfTableColumn>;
  private labelFilter : string;
  private nomeQuestionario : string;
  private categoriaQuestionario : string;

  private readonly filterSettings: ThfPageFilter = {
    action: 'filterAction',
    ngModel: 'labelFilter',
    placeholder: 'Busca'
  };

  private readonly actions : Array<ThfPageAction> = [
    { label: "Novo Questionário", action: 'adicionarQuestionario', icon: 'thf-icon-plus' },
  ];

  private readonly tableActions : Array<ThfTableAction> = [
    { action: 'editar', label: 'Editar' },
    { action: 'excluir', label: 'Excluir'}
  ]

  private readonly listaDeCategorias : Array<ThfSelectOption> = [
    { label: 'Tecnologia', value: "1" },
    { label: 'Negócios', value: "2"}
  ]

  private readonly adicionarQuestionarioPrimaryAction : ThfModalAction = {
    action: () => {
      this.questionarioService.cadastra({ 'nome': this.nomeQuestionario, 'categoria' : this.categoriaQuestionario }).subscribe( res => {

        this.carregarQuestionarios();
        this.adicionarQuestionarioModal.close();
      }, err =>{
        console.log(err);
      })
    },
    label: "Adicionar"
  }
  

  @ViewChild('adicionarQuestionarioModal') adicionarQuestionarioModal: ThfModalComponent;


  constructor(private questionarioService: QuestionarioService, private router: Router) {

   }

  ngOnInit() {
    this.carregarQuestionarios();
  }

  carregarQuestionarios(){
    this.questionariosColunas = this.questionarioService.getColumns();
    this.questionarioService.getItems().subscribe( items => {
      this.questionarios = items;
      this.questionariosFiltrados = [...this.questionarios];
    }, err => {
      console.log(err);
    })
  }
  
  filterAction(filters = [this.labelFilter]){
    this.questionariosFiltrados = this.questionarios.filter( (item) => {
      return Object.keys(item).some( key => {
        return (!(item[key] instanceof Object) && this.includeFilter(item[key], filters))
      });
    });
  }

  includeFilter(item, filters) {
    return filters.some(filter => String(item).toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
  }

  adicionarQuestionario(){
    this.adicionarQuestionarioModal.open();
  }

  editar(item){
    this.router.navigate(['pergunta/'+ item.id]);
  }

  excluir(item){

    this.questionarioService.excluir(item).subscribe( res => {
      let index = this.questionarios.indexOf(item);
      if(index > -1){
        this.questionarios.splice(index,1);
        this.questionariosFiltrados = this.questionarios;
      }
    }, err => {
      console.log(err);
    });
    
  }


}
