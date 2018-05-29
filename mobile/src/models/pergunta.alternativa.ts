import { PerguntaPadrao } from './pergunta.padrao';

export class PerguntaAlternativa extends PerguntaPadrao<string>{
    controlType = 'dropdown';
    options : {key: string, value: string}[] = [];

    constructor(options : {} = {}){
        super(options);
        this.options = [
            {key: 'Sim', value: 'Sim'},
            {key: 'Não', value: 'Não' }
        ];
    }
}