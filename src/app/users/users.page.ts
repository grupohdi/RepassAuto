import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AlertComponent } from '../../components/alert/alert';
import { LoaderComponent } from '../../components/loader/loader';

import { ILocalStorageRepository } from '../../repository/interfaces/ILocalStorageRepository';
import { IRlUserService } from '../../services/interfaces/IRlUserService';
import { IUserService } from '../../services/interfaces/IUserService';
import { UserDto } from '../../dto/userDto';


@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})

export class UsersPage implements OnInit {

  public logged: any;
  public rlUser: any;
  public company: any;
  public rlUsers: any[];
  public users = [];
  public carregando: string = "Procurando Usuários cadastrados...";

  constructor(
    private router: Router,
    private loaderCtrl: LoaderComponent,
    private platform: Platform,
    private alertCtrl: AlertComponent,
    private alertController: AlertController,
    public nav: NavController,
    @Inject('LocalStorageRepositoryToken') private localStorageRepository: ILocalStorageRepository,
    @Inject('UserServiceToken') private userService: IUserService,
    @Inject('RlUserServiceToken') private rlUserService: IRlUserService) {

  }

  ngOnInit() {

    let user = this.localStorageRepository.recuperaConfiguracaoPorChave('user');
    if (user) {
      this.logged = JSON.parse(user);
    }
    let rlUser = this.localStorageRepository.recuperaConfiguracaoPorChave('rlUser');
    if (user) {
      this.rlUser = JSON.parse(rlUser);
    }
    let company = this.localStorageRepository.recuperaConfiguracaoPorChave('company');
    if (company) {
      this.company = JSON.parse(company);
    }

    this.initializeConfiguration();
  }

  ionViewDidEnter() {
  }

  async initializeConfiguration() {

    this.platform.ready().then(async () => {


      this.loaderCtrl.showLoader(`Carregando...`);


      await this.rlUserService.getByCompany(this.rlUser.companyId)
        .then(async (result: any) => {


          // console.log('---------------------------------');
          // console.log(result);

          if (result) {
            this.rlUsers = result || [];

            this.users = [];

            this.rlUsers.map((rlUser) => {

              this.userService.obterPorId(rlUser.userId).then((user) => {
              if (user) {
                  this.users.push(user);
                }
              });
            });
            this.loaderCtrl.hiddenLoader();


          } else {
            this.carregando = "nenhum usuário cadastrado";
            this.loaderCtrl.hiddenLoader();
          }
        })
        .catch((e: any) => {
          this.loaderCtrl.hiddenLoader();
          this.alertCtrl.showAlert('RepassAuto - Usuários', `Erro ao carregar os usuários.`);
        });


    });

  }


  async abrir(userId: string) {

    let navigationExtras: NavigationExtras = { "state": { "userId" : userId} };

    //console.log(navigationExtras);
    this.router.navigate(['/users/user'], navigationExtras);


  }

  async adicionar(vehicle: any) {

    let navigationExtras: NavigationExtras = { state: {} };

    this.router.navigate(['/users/user'], navigationExtras);


  }

  async apagar(vehicle: any) {

    let attemption = '<b>Atenção!</b><br> Para apagar um usuário, ele não pode estar em nenhuma transação.';
    attemption += 'Tem certeza?';

    const alert = await this.alertController.create({
      subHeader: 'RepassAuto - Cadastro de Usuários',
      message: attemption,
      cssClass: 'custom-alert-class',
      buttons: [
        {
          text: 'Sim',
          role: 'cancel',
          handler: () => {
            console.log('sim');
          }
        },
        {
          text: 'Não',
          handler: () => {
            console.log('Não');
          }
        }
      ]
    });
    await alert.present();


  }



}
