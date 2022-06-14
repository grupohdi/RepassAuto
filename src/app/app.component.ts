import { Component, Inject } from '@angular/core';
import { Platform,NavController} from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { ILocalStorageRepository } from '../repository/interfaces/ILocalStorageRepository';
import { UserDto } from '../dto/UserDto';
import { RlUserDto } from '../dto/RlUserDto';
import { CompanyDto } from '../dto/CompanyDto';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPagesInit = [
    { title: 'Cadastrar Agência', url: '/company', icon: 'settings', param:'0' },
  ];
  public appPagesManager = [
    { title: 'Ofertas', url: '/offers', icon: 'megaphone', param:'1' },
    { title: 'Minhas Ofertas', url: '/myOffers', icon: 'rocket', param:'1' },
    { title: 'Meus Veículos', url: '/myVehicles', icon: 'car-sport' , param:'1'},
    { title: 'Usuários', url: '/users', icon: 'people', param:'1' },
    { title: 'Perímetros', url: '/perimeters', icon: 'location', param:'1' },
    { title: 'Manutenção Agência', url: '/company', icon: 'settings', param:'1' },
  ];
  public appPagesUser = [
    { title: 'Ofertas', url: '/offers', icon: 'megaphone', param:'1' },
    { title: 'Minhas Ofertas', url: '/myOffers', icon: 'rocket', param:'1' },
    { title: 'Meus Veículos', url: '/myVehicles', icon: 'car-sport', param:'1' },
    { title: 'Perímetros', url: '/perimeters', icon: 'settings', param:'1' },
  ];


  public labelPages = [
    { title: 'Login', url: '/login', icon: 'person', param:'0' },
    { title: 'Sair', url: '/signOut', icon: 'exit', param:'0' },
    { title: 'Ajuda', url: '/help', icon: 'help' , param:'0'},
    { title: 'Termos e Condições', url: '/terms', icon: 'library', param:'0' },
  ];

  public user: UserDto = new UserDto(); // = { id: "", name:"", phone:"",  mail:"", role:"", companyId: "", companyName: "Agência" };
  public rlUser: RlUserDto = new RlUserDto(); // = { id: "", name:"", phone:"",  mail:"", role:"", companyId: "", companyName: "Agência" };
  public company: CompanyDto = new CompanyDto(); // = { id: "", name:"", phone:"",  mail:"", role:"", companyId: "", companyName: "Agência" };
  public logged: boolean = false;
  public manager: boolean = false;
  public vendor: boolean = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private screenOrientation: ScreenOrientation,
    private statusBar: StatusBar,
    public nav: NavController,
    public router: Router,
    private androidPermissions: AndroidPermissions,
    @Inject('LocalStorageRepositoryToken') private localStorageRepository: ILocalStorageRepository,


  ) {
    this.initializeApp();
  }


  initializeApp() {

    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();
  
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);      
      

      this.verifyPermissions();

      let user = this.localStorageRepository.recuperaConfiguracaoPorChave('user');
      if (user) {
        this.user = JSON.parse(user);

        let rlUser = this.localStorageRepository.recuperaConfiguracaoPorChave('rlUser');
        if (rlUser) {
          this.rlUser = JSON.parse(rlUser);


          let company = this.localStorageRepository.recuperaConfiguracaoPorChave('company');
          if (rlUser) {
            this.company = JSON.parse(company);


            this.logged = true;
            this.manager = (this.user.role.trim() === "platform_manager_access");
            this.vendor = (this.user.role.trim() ==="platform_user_access");

            let navigationExtras: NavigationExtras = {queryParams: {mode: "1"}};
            this.router.navigate(['/offers'], navigationExtras);
        
          };
        };
     };
  
    });
  

  }

  async openUrlMenu(data: any) {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        mode: data.param
      }
    };
    this.router.navigate([data.url], navigationExtras);
  }


  private verifyPermissions() {


    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => { 
        console.log('CAMERA Has permission?',result.hasPermission);
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA);
      },
      err => {
        console.log('CAMERA Has error',err);
      }
    );
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
      result => { 
        console.log('READ_EXTERNAL_STORAGE Has permission?',result.hasPermission);
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE);
      },
      err => {
        console.log('READ_EXTERNAL_STORAGE Has error',err);
      }
    );

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
      result => { 
        console.log('WRITE_EXTERNAL_STORAGE Has permission?',result.hasPermission);
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE);
      },
      err => {
        console.log('WRITE_EXTERNAL_STORAGE Has error',err);
      }
    );
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.INTERNET).then(
      result => { 
        console.log('INTERNET Has permission?',result.hasPermission);
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.INTERNET);
      },
      err => {
        console.log('INTERNET Has error',err);
      }
    );
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_NETWORK_STATE).then(
      result => { 
        console.log('ACCESS_NETWORK_STATE Has permission?',result.hasPermission);
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_NETWORK_STATE);
      },
      err => {
        console.log('ACCESS_NETWORK_STATE Has error',err);
      }
    );
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => { 
        console.log('ACCESS_COARSE_LOCATION Has permission?',result.hasPermission);
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION);
      },
      err => {
        console.log('ACCESS_COARSE_LOCATION Has error',err);
      }
    );
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(
      result => { 
        console.log('ACCESS_FINE_LOCATION Has permission?',result.hasPermission);
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION);
      },
      err => {
        console.log('ACCESS_FINE_LOCATION Has error',err);
      }
    );       
}

}

