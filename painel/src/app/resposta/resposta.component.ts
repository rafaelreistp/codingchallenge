import { RespostaService } from './../../services/resposta.service';
import { QuestionarioService } from './../../services/questionario.service';
import { ActivatedRoute } from '@angular/router';
import { ThfTableColumn } from '@totvs/thf-ui/components/thf-table';
import { Component, OnInit } from '@angular/core';
import { ThfPageFilter } from '@totvs/thf-ui/components/thf-page';

@Component({
  selector: 'app-resposta',
  templateUrl: './resposta.component.html',
  providers: [RespostaService]
})
export class RespostaComponent implements OnInit {

  private questionarioId : number;


  private labelFilter : string;
  private respostas : Array<any>
  private respostasFiltradas : Array<any>
  private respostasColunas : Array<ThfTableColumn>;

  private readonly filterSettings: ThfPageFilter = {
    action: 'filterAction',
    ngModel: 'labelFilter',
    placeholder: 'Busca'
  };

  constructor(private route: ActivatedRoute, private respostaService: RespostaService) {
    this.route.params.subscribe( params => {
      this.questionarioId = params['id'];
    });
   }

  ngOnInit() {
    this.respostasColunas = this.respostaService.getColumns();
    this.respostaService.getItems(this.questionarioId).subscribe (items => {
      this.respostas = items;
      this.respostasFiltradas = [...this.respostas];
    }, err => {
      console.log(err);
    })
  }

  filterAction(filters = [this.labelFilter]){
    this.respostasFiltradas = this.respostas.filter( (item) => {
      return Object.keys(item).some( key => {
        return (!(item[key] instanceof Object) && this.includeFilter(item[key], filters))
      });
    });
  }

  includeFilter(item, filters) {
    return filters.some(filter => String(item).toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
  }

}
