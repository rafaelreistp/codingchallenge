import { PerguntaPadrao } from './../../models/pergunta.padrao';
import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';
 
@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.html'
})
export class DynamicFormQuestionComponent {
  @Input() question: PerguntaPadrao<any>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.question.id].valid; }

}