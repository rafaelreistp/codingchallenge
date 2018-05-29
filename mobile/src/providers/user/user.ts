import { HttpClient } from '@angular/common/http';
import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class UserProvider {

    private url : string = 'http://localhost:8080/login/';

    private _loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public loggedIn : Observable<boolean> = this._loggedIn.asObservable();

    constructor(private http: HttpClient){
    }

    autentica(usuario){
        return this.http.post(this.url, usuario)
        .map( (res:any) => {
            var token = res.token;
            if(token){
                this._loggedIn.next(true);
                localStorage.setItem('token', token);
            }
            return res;
        });
    }

    logout(){
        localStorage.removeItem('token');
    }

    isLoggedIn(){
        let token = localStorage.getItem('token');
        if(token){
            this._loggedIn.next(true);
        } else{
            this._loggedIn.next(false);
        }

        return this._loggedIn.getValue();
    }
}