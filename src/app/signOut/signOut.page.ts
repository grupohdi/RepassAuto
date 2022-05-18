import { Component, Inject, OnInit } from '@angular/core';
import { ILocalStorageRepository } from '../../repository/interfaces/ILocalStorageRepository';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { AlertComponent } from '../../components/alert/alert';
import { LoaderComponent } from '../../components/loader/loader';


@Component({
  selector: 'app-signOut',
  templateUrl: './signOut.page.html',
  styleUrls: ['./signOut.page.scss'],
})
export class SignOutPage {
  public user: any;

  constructor(
    private platform: Platform,
    public navController: NavController,
    public alertController: AlertController,
    public alertComp: AlertComponent,
    private loaderCtrl: LoaderComponent,
    @Inject('LocalStorageRepositoryToken') private localStorageRepository: ILocalStorageRepository,
  ) { 

    this.initialize();
  }

  initialize() {

    this.platform.ready().then(() => {
      this.deslogar();
    });

  }


  async deslogar() {

    if (this.localStorageRepository.recuperaConfiguracaoPorChave("user")) {

      const alert = await this.alertController.create({
        message: 'Deseja sair do RepassAuto?',
        subHeader: 'RepassAuto',
        buttons: [
          {
            text: 'Não',
            handler: () => {
              this.navController.navigateForward('/');

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
    else {
      this.navController.navigateRoot('/login');
    }

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

