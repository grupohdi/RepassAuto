import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, NavParams, IonicRouteStrategy } from '@ionic/angular';

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
import {FunctionsProvider } from '../providers/functions/functions';
import { LocalStorageRepository } from '../repository/LocalStorageRepository';
import { HttpClientProxy } from '../services/HttpClientProxy';

import { AlertComponent } from '../components/alert/alert';
import { LoaderComponent } from '../components/loader/loader';
import { ToastComponent } from '../components/toast/toast';
import { FiltersComponent } from '../components/filters/filters.component';
import { LocalNotificationComponent } from '../components/local-notification/local-notification';


import { UserService } from '../services/UserService';
import { RlUserService } from '../services/RlUserService';
import { CompanyService } from '../services/CompanyService';
import { ParametroRepository } from '../Repository/ParametroRepository';
import { ConfiguracaoService } from '../services/ConfiguracaoService';
import { VeiculoOfertaService } from '../services/VeiculoOfertaService';
import { VeiculoService } from '../services/VeiculoService';
import { VeiculoFotoService } from '../services/VeiculoFotoService';
import { FipeService } from '../services/FipeService';
import { PerimetroService } from '../services/PerimetroService';
import { SetupService } from '../services/setupService';

import { Camera } from '@ionic-native/camera/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { BrMaskerModule } from 'br-mask';

// geolocation and native-geocoder
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';


@NgModule({
  declarations: [AppComponent,FiltersComponent],
  entryComponents: [FiltersComponent],
  imports: [ FormsModule, CommonModule, HttpClientModule, BrowserModule, AppRoutingModule, BrMaskerModule, IonicModule.forRoot({
    backButtonText: 'Retour',
    mode: 'md',
    scrollPadding: false,
    scrollAssist: true
  })],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLite,
    SplashScreen,
    StatusBar,
    ScreenOrientation,
    Network,
   FunctionsProvider,
    HttpInterceptorProvider,
    LocalStorageRepository,
    Keyboard,
    Geolocation,
    NativeGeocoder,
    AlertComponent,
    LoaderComponent,
    ToastComponent,
    LocalNotificationComponent,
    StatusBar,
    SplashScreen,
    AndroidPermissions,
   FunctionsProvider,
    HttpInterceptorProvider,
    ScreenOrientation,
    Network,
    Camera,
    BackgroundMode,
    SwiperModule,
    SocialSharing,
    NavParams,
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  { provide: 'LocalStorageRepositoryToken', useClass: LocalStorageRepository },
  { provide: 'UserServiceToken', useClass: UserService },
  { provide: 'RlUserServiceToken', useClass: RlUserService },
  { provide: 'CompanyServiceToken', useClass: CompanyService },
  { provide: 'HttpClientProxyToken', useClass: HttpClientProxy },
  { provide: 'ParametroRepositoryToken', useClass: ParametroRepository },
  { provide: 'ConfiguracaoServiceToken', useClass: ConfiguracaoService },
  { provide: 'VeiculoOfertaServiceToken', useClass: VeiculoOfertaService },
  { provide: 'VeiculoServiceToken', useClass: VeiculoService },
  { provide: 'VeiculoFotoServiceToken', useClass: VeiculoFotoService },
  { provide: 'VeiculoOfertaServiceToken', useClass: VeiculoOfertaService },
  { provide: 'FipeServiceToken', useClass: FipeService },
  { provide: 'PerimetroServiceToken', useClass: PerimetroService },
  { provide: 'SetupServiceToken', useClass: SetupService },
  { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorProvider, multi: true },

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
