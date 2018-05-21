import { Router } from '@angular/router';
import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class UserService {

    private headers : Headers;
    private url : string;

    private _loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public loggedIn : Observable<boolean> = this._loggedIn.asObservable();

    constructor(private http: Http, private router: Router){
        this.headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});
        this.url = 'http://localhost:8080/login/';
    }

    autentica(usuario){
        return this.http.post(this.url, usuario, { headers: this.headers })
        .map( res => {
            var token = res.json().token;
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