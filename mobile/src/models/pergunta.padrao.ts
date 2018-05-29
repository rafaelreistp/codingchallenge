export class PerguntaPadrao<T> {
    value: T;
    id: number;
    pergunta: string;
    tipo: string;
    required: boolean;
   
    constructor(options: {
        value?: T,
        id?: number,
        pergunta?: string,
        id_questionario?: number,
        tipo?: string,
      } = {}) {
      this.id = options.id;
      this.pergunta = options.pergunta;
      this.tipo = options.tipo;
    }
  }