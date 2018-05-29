import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ThfPageLogin } from '@totvs/thf-ui/components/thf-page';
import { ThfNotificationService } from '@totvs/thf-ui/services/thf-notification/thf-notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router : Router, private thfNotification: ThfNotificationService) { }

  ngOnInit() {
  }

  loginSubmit(formData: ThfPageLogin){
    let usuario = {
      email: formData.login,
      senha: formData.password
    }
    this.userService.autentica(usuario).subscribe( res => {
      if(res.status == 200 && res.json().auth){
        this.router.navigate(['questionario']);
      } else{
        this.thfNotification.error('Falha na autenticação!');
      }
    }, err => {
      this.thfNotification.error('Falha na autenticação!');
      console.log(err);
    });
    
  }

}
