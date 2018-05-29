import { QrcodePage } from './../pages/qrcode/qrcode';
import { DynamicFormComponent } from './../components/dynamic-form/dynamic-form';
import { LoginPage } from './../pages/login/login';
import { HttpModule } from '@angular/http';
import { QuestionarioPage } from './../pages/questionario/questionario';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { QRScanner } from '@ionic-native/qr-scanner'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { QuestionarioProvider } from '../providers/questionario/questionario';
import { HttpClientModule } from '@angular/common/http';
import { UserProvider } from '../providers/user/user';
import { JwtModule } from '@auth0/angular-jwt';
import { PerguntaProvider } from '../providers/pergunta/pergunta';
import { RespostaPage } from '../pages/resposta/resposta';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormQuestionComponent } from '../components/dynamic-form-question/dynamic-form-question';

export function tokenGetter(){
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    QuestionarioPage,
    LoginPage,
    RespostaPage,
    QrcodePage,
    DynamicFormComponent,
    DynamicFormQuestionComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    JwtModule.forRoot({
      config:{
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes: ['localhost:8080/login'],
        headerName: 'x-access-token',
        authScheme: ''
      }
    }),
    IonicModule.forRoot(MyApp)
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    QuestionarioPage,
    LoginPage,
    RespostaPage,
    QrcodePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    QuestionarioProvider,
    UserProvider,
    PerguntaProvider,
    QRScanner
  ]
})
export class AppModule {}
