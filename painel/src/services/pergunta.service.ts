import { HttpService } from './http.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ThfTableColumn } from '@totvs/thf-ui/components/thf-table';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class PerguntaService{

    private headers : Headers;
    private url : string;
    constructor(private http: HttpService, private router: Router){
        this.headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});
        this.url = 'http://localhost:8080/pergunta/';
    }
    
    getColumns(): Array<ThfTableColumn> {
        return[
            { column: 'pergunta', label: 'Pergunta', type: 'string' },
            { column: 'tipo', label: 'Tipo', type: 'string' }
        ];
    }

    getItems(idQuestionario) {
        return this.http
        .get(this.url + idQuestionario)
        .map(res => res.json());
    }

    excluir(pergunta){
        return this.http.delete(this.url + pergunta.id, {headers: this.headers});
    }

    cadastra(pergunta) {
        if(! pergunta.id ){
            return this.http.post( this.url, pergunta, {headers: this.headers})
            .map( (res) => res.json());
        } else {
            return this.http.put(this.url+pergunta.id, pergunta, {headers: this.headers});
        }
        
    }

}