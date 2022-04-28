import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AlertComponent } from '../../components/alert/alert';
import { LoaderComponent } from '../../components/loader/loader';

import { ILocalStorageRepository } from '../../repository/interfaces/ILocalStorageRepository';
import { IVeiculoService } from '../../services/interfaces/IVeiculoService';




import SwiperCore, { SwiperOptions, Autoplay, Keyboard, Pagination, Navigation, Scrollbar, A11y, Zoom } from 'swiper';
SwiperCore.use([Autoplay, Navigation, Keyboard, Pagination, Scrollbar, A11y, Zoom]);

@Component({
  selector: 'app-myVehicles',
  templateUrl: './myVehicles.page.html',
  styleUrls: ['./myVehicles.page.scss'],
})

export class MyVehiclesPage implements OnInit {

  public logged: any;
  public rlUser: any;
  public company: any;
  public vehicles: any[];

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 15,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
    zoom: true
  };
  onSlideChange() {
    //console.log('slide change');
  }

  constructor(
    private router: Router,
    private loaderCtrl: LoaderComponent,
    private platform: Platform,
    private alertCtrl: AlertComponent,
    private alertController: AlertController,
    public nav: NavController,
    @Inject('LocalStorageRepositoryToken') private localStorageRepository: ILocalStorageRepository,

    @Inject('VeiculoServiceToken') private veiculoService: IVeiculoService) {


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

  initializeConfiguration() {

    this.platform.ready().then(() => {


      this.loaderCtrl.showLoader(`Aguarde, carregando meus veículos...`);


      this.veiculoService.getMyVehicle( this.rlUser.companyId, this.logged.id)
        .then((result: any) => {

          console.log(result);
          this.loaderCtrl.hiddenLoader();

          if (result) {
            this.vehicles = result;

          }
        })
        .catch((e: any) => {
          this.loaderCtrl.hiddenLoader();
          this.alertCtrl.showAlert('RepassAuto - Meus Veículos', `Erro ao carregar os veículos.`);
        });
    });

  }


  async abrir(vehicle:any) {

    let navigationExtras: NavigationExtras = { state: { vehicle }  };

    this.router.navigate(['/myVehicles/vehicle'], navigationExtras);


  }

}
