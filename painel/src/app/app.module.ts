import { LoggedInGuard } from './../services/loggedinGuard';
import { HttpService } from './../services/http.service';
import { RespostaComponent } from './resposta/resposta.component';
import { PerguntaComponent } from './pergunta/pergunta.component';
import { QuestionarioComponent } from './questionario/questionario.component';
import { ThfModule } from '@totvs/thf-ui';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'rxjs/add/operator/map';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app.routing.module';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { QuestionarioRespondidoComponent } from './questionario-respondido/questionario-respondido.component';
import { UserService } from '../services/user.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    QuestionarioComponent,
    PerguntaComponent,
    RespostaComponent,
    QuestionarioRespondidoComponent
  ],
  imports: [
    BrowserModule,
    ThfModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
  ],
  providers: [{
    provide: HttpService,
    useFactory: (backend: XHRBackend, options: RequestOptions) => {
      return new HttpService(backend, options);
    },
    deps: [XHRBackend, RequestOptions]
  }, LoggedInGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
