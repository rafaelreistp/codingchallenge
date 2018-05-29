import { PerguntaPadrao } from './../../models/pergunta.padrao';
import { Injectable } from "@angular/core";
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Injectable()
export class PerguntaControlService{
    constructor(){}

    toFormGroup(perguntas: PerguntaPadrao<any>[]){
        let grupo : any = {};

        perguntas.forEach( pergunta => {
            grupo[pergunta.id] = new FormControl(pergunta.value || '', Validators.required)
        });

        return new FormGroup(grupo);
    }
}