import { PerguntaPadrao } from './pergunta.padrao';

export class PerguntaDissertativa extends PerguntaPadrao<string>{
    controlType = 'textbox';
    tipo : string;

    constructor(options : {} = {}){
        super(options);
        this.tipo = options['tipo'] || '';
    }
}