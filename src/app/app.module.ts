import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { SQLite } from '@ionic-native/sqlite/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SwiperModule } from 'swiper/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Network } from '@ionic-native/network/ngx';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorProvider } from '../providers/http-interceptor/http-interceptor';
import { ValidacaoCamposProvider } from '../providers/validacao-campos/validacao-campos';
import { LocalStorageRepository } from '../repository/LocalStorageRepository';
import { HttpClientProxy } from '../services/HttpClientProxy';

import { AlertComponent } from '../components/alert/alert';
import { LoaderComponent } from '../components/loader/loader';
import { ToastComponent } from '../components/toast/toast';
import { LocalNotificationComponent } from '../components/local-notification/local-notification';


import { DataBaseProvider } from '../providers/database/database';
import { UserProvider } from '../providers/database/user';
import { ParametroProvider } from '../providers/database/parametro';

import { UserService } from '../services/UserService';
import { RlUserService } from '../services/RlUserService';
import { CompanyService } from '../services/CompanyService';
import { ParametroRepository } from '../Repository/ParametroRepository';
import { ParametroService } from '../services/ParametroService';
import { ConfiguracaoService } from '../services/ConfiguracaoService';
import { VeiculoOfertaService } from '../services/VeiculoOfertaService';
import { VeiculoService } from '../services/VeiculoService';
import { VeiculoFotoService } from '../services/VeiculoFotoService';

import { Camera } from '@ionic-native/camera/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [ FormsModule, CommonModule, HttpClientModule, BrowserModule, AppRoutingModule, IonicModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLite,
    SplashScreen,
    StatusBar,
    ScreenOrientation,
    Network,
    ValidacaoCamposProvider,
    DataBaseProvider,
    HttpInterceptorProvider,
    LocalStorageRepository,
    Keyboard,
    Geolocation,
    AlertComponent,
    LoaderComponent,
    ToastComponent,
    LocalNotificationComponent,
    StatusBar,
    SplashScreen,
    AndroidPermissions,
    ValidacaoCamposProvider,
    HttpInterceptorProvider,
    UserProvider,
    ParametroProvider,
    ScreenOrientation,
    Network,
    Camera,
    BackgroundMode,
    SwiperModule,
    SocialSharing,
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  { provide: 'LocalStorageRepositoryToken', useClass: LocalStorageRepository },
  { provide: 'UserServiceToken', useClass: UserService },
  { provide: 'RlUserServiceToken', useClass: RlUserService },
  { provide: 'CompanyServiceToken', useClass: CompanyService },
  { provide: 'HttpClientProxyToken', useClass: HttpClientProxy },
  { provide: 'ParametroRepositoryToken', useClass: ParametroRepository },
  { provide: 'ParametroServiceToken', useClass: ParametroService },
  { provide: 'ConfiguracaoServiceToken', useClass: ConfiguracaoService },
  { provide: 'VeiculoOfertaServiceToken', useClass: VeiculoOfertaService },
  { provide: 'VeiculoServiceToken', useClass: VeiculoService },
  { provide: 'VeiculoFotoServiceToken', useClass: VeiculoFotoService },
  { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorProvider, multi: true },

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
