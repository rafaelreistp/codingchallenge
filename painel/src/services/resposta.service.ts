import { HttpService } from './http.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ThfTableColumn } from '@totvs/thf-ui/components/thf-table';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class RespostaService{

    private headers : Headers;
    private url : string;
    constructor(private http: HttpService, private router: Router){
        this.headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});
        this.url = 'http://localhost:8080/resposta/';
    }
    
    getColumns(): Array<ThfTableColumn> {
        return[
            { column: 'nome_questionario', label: 'Questionário', type: 'link', action: (value, row) => {
                this.routeQuestionarioRespondido(value, row);
            }},
            { column: 'nome_usuario', label: 'Usuário', type: 'link', action: (value, row) => {
                this.routeQuestionarioRespondido(value, row);
            }}
        ];
    }

    getQuestionarioRespondidoColumns(): Array<ThfTableColumn> {
        return [
            { column: 'pergunta', label: 'Pergunta', type: 'string' },
            { column: 'resposta', label: 'Resposta', type: 'string'}
        ]
    }

    getRespostaQuestionario(questionarioId, usuarioId){
        return this.http.get(this.url+questionarioId+'/'+usuarioId)
        .map(res => res.json());
    }

    getItems(questionarioId) {
        if(questionarioId){
            return this.http
            .get(this.url+questionarioId)
            .map(res => res.json());
        } else{
            return this.http
            .get(this.url)
            .map(res => res.json());
        }

    }

    routeQuestionarioRespondido(value, row){
        this.router.navigate(['questionarioRespondido/'+ row.id_questionario + '/' + row.id_usuario]);
    }


}