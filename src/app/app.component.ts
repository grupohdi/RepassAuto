import { Component } from '@angular/core';
import { Platform,NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Ofertas', url: '/offers', icon: 'megaphone' },
    { title: 'Minhas Ofertas', url: '/myOffers', icon: 'rocket' },
    { title: 'Meus Veículos', url: '/myVehicles', icon: 'car-sport' },
    { title: 'Vendedores', url: '/users', icon: 'people' },
    { title: 'Perímetros', url: '/perimeters', icon: 'settings' },
    { title: 'Sair', url: '/signOut', icon: 'exit' },
  ];
  public labelPages = [
    { title: 'Ajuda', url: '/help', icon: 'help' },
    { title: 'Termos e Condições', url: '/terms', icon: 'library' },
  ];

  public user: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private screenOrientation: ScreenOrientation,
    private statusBar: StatusBar,
    public nav: NavController
  ) {
    this.initializeApp();
  }


  initializeApp() {

    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();
  
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);          

    });
  


    let logged: any = { id: "USER-GER-0001",
                        name:"Jose dos Santos", 
                        phone:"+5511983194534", 
                        mail:"gerente@grupohdi.com", 
                        role:"platform_manager_access",
                        companyId: "XYZ-0001",
                        companyName: "Agência de Testes 0001",
                      };


    localStorage.setItem("user",JSON.stringify(logged));
    this.user = JSON.parse(localStorage.getItem("user"));
  }
}

