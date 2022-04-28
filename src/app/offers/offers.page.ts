import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AlertComponent } from '../../components/alert/alert';
import { LoaderComponent } from '../../components/loader/loader';

import { ILocalStorageRepository } from '../../repository/interfaces/ILocalStorageRepository';

import { IVeiculoOfertaService } from '../../services/interfaces/IVeiculoOfertaService';


import SwiperCore, { SwiperOptions, Autoplay, Keyboard, Pagination, Navigation, Scrollbar, A11y, Zoom } from 'swiper';
SwiperCore.use([Autoplay, Navigation, Keyboard, Pagination, Scrollbar, A11y, Zoom]);

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})

export class OffersPage implements OnInit {

  private confirm;

  public offers: any[];

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 25,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
    autoplay: { delay: 5000 },

    zoom: true
  };
  onSwiper([swiper]) {
    //console.log(swiper);
  }
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

    @Inject('VeiculoOfertaServiceToken') private veiculoOfertaService: IVeiculoOfertaService) {

  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.initializeConfiguration();
  }

  initializeConfiguration() {

    this.platform.ready().then(() => {



      this.loaderCtrl.showLoader(`Aguarde, carregando ofertas...`);


      this.veiculoOfertaService.getOffers()
        .then((result: any) => {

          this.loaderCtrl.hiddenLoader();

          if (result) {
            this.offers = result;

          }
        })
        .catch((e: any) => {
          this.loaderCtrl.hiddenLoader();
          this.alertCtrl.showAlert('RepassAuto - Ofertas', `Erro ao carregar as Ofertas.`);
        });
    });

  }


  async verTodosDados(offer: any) {

    let attemption = '<b>Atenção!</b><br> A visualização dos dados completos, gera uma tarifa de: <br> <b>R$ 20,00</b><br><br>';
       attemption +=  'Será debitado do cartão da Agência.<br><br>';
       attemption +=  'Tem certeza?';

    const alert = await this.alertController.create({
      subHeader: 'RepassAuto - Ofertas',
      message: attemption,
      cssClass: 'alert-warning',
      buttons: [
        {
          text: 'Aceitar',
          role: 'cancel',
          handler: () => {
            console.log('aceitou');
            let navigationExtras: NavigationExtras = { state: { offer }  };
            this.router.navigate(['/offers/vehicle-full'], navigationExtras);
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
