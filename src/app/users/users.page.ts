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
  public users: any[];
  public carregando: string = "Procurando por Usuários cadastrados...";

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


    this.platform.ready().then(async () => {


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


    });

  }

  ionViewDidEnter() {
    this.doRefresh(null);
  }


  async carregarRefresh(refresher: any) {


    this.users = null;

    await this.rlUserService.getByCompany(this.rlUser.companyId)
      .then(async (result: any) => {


        if (result) {
          this.rlUsers = result || [];

          let aUsers = [];
          await this.rlUsers.map((rlUser) => {

            this.userService.obterPorId(rlUser.userId).then((user) => {
              if (user) {
                user.rlUserId = rlUser.id;
                aUsers.push(user);
              }
            });
          });
          this.users = aUsers;
          await this.ordenar();
  
          if (refresher)
              refresher.target.complete();

        } else {
          this.carregando = "nenhum usuário cadastrado";

          if (refresher)
            refresher.target.complete();
        }
      })
      .catch((e: any) => {

        if (refresher)
          refresher.target.complete();
  
        this.alertCtrl.showAlert('RepassAuto - Usuários', `Erro ao carregar os usuários.`);
      });

  }


  async abrir(user: UserDto) {

    if (user == undefined) {
      user = new UserDto();
    }
    let navigationExtras: NavigationExtras = { "state": { "user": user } };
    this.router.navigate(['/users/user'], navigationExtras);


  }


  async apagar(user: any) {

    let attemption = '<b>Atenção!</b><br> Para apagar um usuário, ele não pode estar em nenhuma transação.';
    attemption += 'Tem certeza?';

    const alert = await this.alertController.create({
      subHeader: 'RepassAuto - Cadastro de Usuários',
      message: attemption,
      cssClass: 'custom-alert-class',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Não');
          }
        },
        {
          text: 'Sim',
          role: 'cancel',
          handler: () => {

            this.userService.deletar(user);
            this.doRefresh(null);


          }
        }
      ]
    });
    await alert.present();


  }


  async doRefresh(refresher) {
    this.carregarRefresh(refresher);
  }

  async ordenar() {
    await this.users.sort(function (a, b) {
      if (a.createdAt > b.createdAt)
        return -1;
      if (a.createdAt < b.createdAt)
        return 1;
      return 0;
    });
  }


}
