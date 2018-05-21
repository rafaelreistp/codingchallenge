import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { Component } from '@angular/core';
import { ThfToolbarModule, ThfToolbarAction } from '@totvs/thf-ui/components/thf-toolbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private userService: UserService, private router: Router){

  }
  
  private readonly userActions : Array<ThfToolbarAction> = [
    { action:'logout', label: 'Logout'}
  ]
  
  menus = [
    { label: 'Questionários', link: './questionario' },
    { label: 'Respostas', link: './resposta'}
  ];

  logout(){
    this.userService.logout();
    this.router.navigate(['login']);
  }


}
