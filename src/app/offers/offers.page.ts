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
  public vehicle: any = {marca:"", modelo:"", referencia:""};
  public carregando: string = "Procurando Ofertas...";
  public Marcas: any[] = [{"Descricao":"BMW"},{"Descricao":"Mercedez Bens"},{"Descricao":"Toyota"}];
  public Modelos: any[] = [{"Descricao":"X1"},{"Descricao":"C180"},{"Descricao":"XEI"}];
  public Versoes: any[]= [{"Descricao":"TURBO ACTIVE XDRIVE25I SPORT"},{"Descricao":"CGI AVANTGARDE 7G-TRONIC"},{"Descricao":"XEI 1.8 Aut. Gasolina"}];

  marcaActionSheetOptions: any = {
    header: 'Marcas',
    subHeader: 'Selecione a Marca',
  };

  modeloActionSheetOptions: any = {
    header: 'Modelos',
    subHeader: 'Selecione o Modelo',
  };


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

      this.loaderCtrl.showLoader(`Carregando...`);

      this.veiculoOfertaService.getOffers()
        .then((result: any) => {
          if (result) {
            this.offers = result;
            this.ordenar();
          }
          else {
            this.carregando = "Nesse momento não existem ofertas...";
          }
          this.loaderCtrl.hiddenLoader();

        }).catch((e: any) => {
          this.loaderCtrl.hiddenLoader();
          this.alertCtrl.showAlert('RepassAuto - Ofertas', `Erro ao carregar as Ofertas.`);
        });
    });

  }

  initializeConfigurationRefresh(refresher:any) {

    this.platform.ready().then(() => {

      this.veiculoOfertaService.getOffers()
        .then((result: any) => {

          if (result) {
            this.offers = result || [];
            this.ordenar();
          }
          else {
            this.carregando = "Nesse momento não existem ofertas...";
          }
          if (refresher)
          refresher.target.complete();

        })
        .catch((e: any) => {
          if (refresher)
          refresher.target.complete();
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
      cssClass: 'custom-alert-class',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Não');
          }
        },
        {
          text: 'Aceitar',
          role: 'cancel',
          handler: () => {
            console.log('aceitou');
            let navigationExtras: NavigationExtras = { state: { offer }  };
            this.router.navigate(['/offers/vehicle-full'], navigationExtras);
                  }
        }
      ]
    });
    await alert.present();




  }


  preencheModelo() {

    //

  }


 doRefresh(refresher) {
    this.initializeConfigurationRefresh(refresher);
  }

  ordenar() {
    this.offers.sort(function (a, b) {
      if (a.createdAt > b.createdAt)
        return -1;
      if (a.createdAt < b.createdAt)
        return 1;
      return 0;
    });
  }

}
