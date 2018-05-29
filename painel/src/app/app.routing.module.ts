import { PerguntaComponent } from './pergunta/pergunta.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionarioComponent } from './questionario/questionario.component';
import { RespostaComponent } from './resposta/resposta.component';
import { QuestionarioRespondidoComponent } from './questionario-respondido/questionario-respondido.component';
import { LoggedInGuard } from '../services/loggedinGuard';


const routes: Routes = [
  {path: 'login', component: LoginComponent },
  { path: 'questionario', component: QuestionarioComponent, canActivate: [LoggedInGuard] },
  { path: 'pergunta/:id', component: PerguntaComponent, canActivate: [LoggedInGuard] },
  { path: 'resposta', component: RespostaComponent, canActivate: [LoggedInGuard] },
  { path: 'resposta/:id', component: RespostaComponent, canActivate: [LoggedInGuard] },
  { path: 'questionarioRespondido/:questionarioId/:usuarioId', component: QuestionarioRespondidoComponent, canActivate: [LoggedInGuard]},
  { path: '**', redirectTo: 'questionario' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }