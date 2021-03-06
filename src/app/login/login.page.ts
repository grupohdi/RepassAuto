import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { AlertComponent } from '../../components/alert/alert';
import { LoaderComponent } from '../../components/loader/loader';
import { UserDto } from '../../dto/UserDto';
import { RlUserDto } from '../../dto/RlUserDto';
import { CompanyDto } from '../../dto/CompanyDto';
import { IUserService } from '../../services/interfaces/IUserService';
import { IRlUserService } from '../../services/interfaces/IRlUserService';
import { ICompanyService } from '../../services/interfaces/ICompanyService';
import { ILocalStorageRepository } from '../../repository/interfaces/ILocalStorageRepository';


@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})

export class LoginPage implements OnInit {
  @ViewChild('inputLogin') inputLogin: any;
  @ViewChild('inputPassword') inputPassword: any;

  public user: UserDto = new UserDto();
  public rlUser: RlUserDto = new RlUserDto();
  public company: CompanyDto = new CompanyDto();
  public logged: boolean = false;

  constructor(
    private loaderCtrl: LoaderComponent,
    private platform: Platform,
    private alertCtrl: AlertComponent,
    private alertController: AlertController,
    public nav: NavController,
    @Inject('LocalStorageRepositoryToken') private localStorageRepository: ILocalStorageRepository,
    @Inject('UserServiceToken') private userService: IUserService,
    @Inject('RlUserServiceToken') private rlUserService: IRlUserService,
    @Inject('CompanyServiceToken') private companyService: ICompanyService) {

    this.initializeConfiguration();
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.initializeConfiguration();
  }

  initializeConfiguration() {

    this.platform.ready().then(() => {

      if (this.localStorageRepository.recuperaConfiguracaoPorChave('user')) {
        this.user = JSON.parse(this.localStorageRepository.recuperaConfiguracaoPorChave('user'));
        this.logged = true;
      }

    });

  }


  onKeyPressed(event, field) {

    if (event.keyCode == 13) {
      if (field == 0) {
        this.inputPassword.setFocus();
      }
      else {
        this.inputLogin.setFocus();
      }
    }

    return true;
  }


  public login() {

    this.loaderCtrl.showLoader(`Aguarde, fazendo login...`);


    console.log(this.user);

    this.userService.logar(this.user)
      .then((responseUser: any) => {

        if (responseUser) {
          let user = this.localStorageRepository.recuperaConfiguracaoPorChave('user');
          this.user = JSON.parse(user);

          this.rlUserService.getByUser(this.user.id)
            .then((result2: any) => {

              if (result2) {
                let rlUser = this.localStorageRepository.recuperaConfiguracaoPorChave('rlUser');
                if (rlUser) {
                  this.rlUser = JSON.parse(rlUser);


                  this.companyService.getById(this.rlUser.companyId)
                    .then((result3: any) => {
                      this.loaderCtrl.hiddenLoader();

                      if (result3) {
                        let company = this.localStorageRepository.recuperaConfiguracaoPorChave('company');
                        if (company) {
                          this.company = JSON.parse(company);


                          let id = setInterval(() => {
                            window.location.reload();
                            clearInterval(id);
                          }, 1000);
                        }
                      }
                      else {
                        this.loaderCtrl.hiddenLoader();
                        this.alertCtrl.showAlert('RepassAuto - Agencia', `Agencia inv??lida.`);
                      }
                    })
                    .catch((e: any) => {
                      this.loaderCtrl.hiddenLoader();
                      this.alertCtrl.showAlert('RepassAuto - Agencia', `Agencia inv??lida.`);
                    });


                }
              }
              else {
                this.loaderCtrl.hiddenLoader();
                this.alertCtrl.showAlert('RepassAuto - Relacionamento', `Relacionamento Usu??rio inv??lido.`);
              }
            })
            .catch((e: any) => {
              this.loaderCtrl.hiddenLoader();
              this.alertCtrl.showAlert('RepassAuto - Relacionamento', `Relacionamento Usu??rio inv??lido.`);
            });



        }
        else {
          this.loaderCtrl.hiddenLoader();
          this.logged = false;
          this.alertCtrl.showAlert('RepassAuto - Login', `Usu??rio e Senha inv??lidas.`);
        }
      })
      .catch((e: any) => {
        this.loaderCtrl.hiddenLoader();
        this.alertCtrl.showAlert('RepassAuto - Login', `Usu??rio e Senha inv??lidas.`);
      });


  }

  async sair() {

    const alert = await this.alertController.create({
      message: 'Deseja sair do app RepassAuto?',
      subHeader: 'RepassAuto',
      cssClass: 'custom-alert-class',
      buttons: [
        {
          text: 'N??o',
          handler: () => {
            this.nav.navigateForward('/');

          }
        },
        {
          text: 'Sim',
          role: 'cancel',
          handler: () => {
            this.exitPage();
          }
        },
      ]
    });
    await alert.present();

  }

  exitPage() {
    this.loaderCtrl.showLoader('Saindo do RepassAuto...');

    this.localStorageRepository.removeConfiguracao("sessionToken");
    this.localStorageRepository.removeConfiguracao("user");
    this.localStorageRepository.removeConfiguracao("rlUser");
    this.localStorageRepository.removeConfiguracao("company");

    this.loaderCtrl.hiddenLoader();
    window.location.reload();



  }


}
