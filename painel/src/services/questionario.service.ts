import { RouterModule, Routes, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ThfTableColumn } from '@totvs/thf-ui/components/thf-table';
import {  Headers, Response, RequestOptions } from '@angular/http';
import { HttpService } from './http.service'
import { Observable } from 'rxjs';

@Injectable()
export class QuestionarioService{

    private url : string;
    constructor(private http: HttpService, private router: Router){
        this.url = 'http://localhost:8080/questionario/';
    }
    
    getColumns(): Array<ThfTableColumn> {
        return[
            { column: 'id', label: 'ID', type: 'string'},
            { column: 'nome', label: 'Titulo', type: 'link', action: (value, row) => {
                this.routeEditar(value,row);
            }},
            { column: 'categoria', label: 'Categoria', type: 'string' },
            { column: 'nome_usuario', label: 'Autor', type: 'string'}
        ];
    }

    getItems() {
        return this.http
        .get(this.url)
        .map(res => res.json());
    }

    getItem(questionarioId){
        return this.http
        .get(this.url+questionarioId)
        .map( res => res.json());
    }

    cadastra(questionario) {
        return this.http.post( this.url, questionario)
        .map( (res) => res.json());
    }

    excluir(questionario) {
        return this.http.delete( this.url+questionario.id);
    }

    routeEditar(value, row){
        this.router.navigate(['pergunta/'+ row.id ]);
    }

}