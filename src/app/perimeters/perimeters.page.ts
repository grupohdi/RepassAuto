import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AlertComponent } from '../../components/alert/alert';
import { LoaderComponent } from '../../components/loader/loader';

import { ILocalStorageRepository } from '../../repository/interfaces/ILocalStorageRepository';
import { IPerimetroService } from '../../services/interfaces/IPerimetroService';
import { PerimetroDto } from '../../dto/perimetroDto';


@Component({
  selector: 'app-perimeters',
  templateUrl: './perimeters.page.html',
  styleUrls: ['./perimeters.page.scss'],
})

export class PerimetersPage implements OnInit {

  public logged: any;
  public rlUser: any;
  public company: any;
  public perimeters = [];
  public carregando: string = "Procurando Perímetros cadastrados...";

  constructor(
    private router: Router,
    private loaderCtrl: LoaderComponent,
    private platform: Platform,
    private alertCtrl: AlertComponent,
    private alertController: AlertController,
    public nav: NavController,
    @Inject('LocalStorageRepositoryToken') private localStorageRepository: ILocalStorageRepository,
    @Inject('PerimetroServiceToken') private perimetroService: IPerimetroService ) {

  }

  ngOnInit() {

    let user = this.localStorageRepository.recuperaConfiguracaoPorChave('user');
    if (user) {
      this.logged = JSON.parse(user);
    }
    let rlUser = this.localStorageRepository.recuperaConfiguracaoPorChave('rlUser');
    if (rlUser) {
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


      await this.perimetroService.getAll(this.rlUser.companyId, this.rlUser.userId)
        .then(async (result: any) => {


          this.loaderCtrl.hiddenLoader();
          if (result) {
            this.perimeters = result || [];
          } else {
            this.carregando = "nenhum perímetro cadastrado";
            this.loaderCtrl.hiddenLoader();
          }
        })
        .catch((e: any) => {
          this.loaderCtrl.hiddenLoader();
          this.alertCtrl.showAlert('RepassAuto - Usuários', `Erro ao carregar os perímetros.`);
        });


    });

  }


  async abrir(perimeterId: string) {

    let navigationExtras: NavigationExtras = { "state": { "perimeterId" : perimeterId} };
    this.router.navigate(['/perimeters/perimeter'], navigationExtras);


  }

  async adicionar(vehicle: any) {

    let navigationExtras: NavigationExtras = { "state": { "perimeterId": ""} };

    this.router.navigate(['/perimeters/perimeter'], navigationExtras);


  }

  async apagar(vehicle: any) {

    let attemption = '<b>Atenção!</b><br>';
    attemption += 'Tem certeza?';

    const alert = await this.alertController.create({
      subHeader: 'RepassAuto - Cadastro de Perímetros',
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
