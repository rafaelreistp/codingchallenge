import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class LoggedInGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router){}

    canActivate(){
        let isLoggedIn = this.userService.isLoggedIn();
        if(! isLoggedIn){
            this.router.navigate(['login']);
        }
        return isLoggedIn;
    }
}