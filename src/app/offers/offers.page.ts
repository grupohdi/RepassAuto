import { Component, Inject, OnInit, ViewChildren } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NavController, Platform, ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AlertComponent } from '../../components/alert/alert';
import { LoaderComponent } from '../../components/loader/loader';
import { FiltersComponent } from '../../components/filters/filters.component';

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
  public carregando: boolean = true;

  public logged: any;
  public rlUser: any;
  public company: any;


  public offers: any[];
  public vehicle: any = { marca: "", modelo: "", referencia: "" };
  public Marcas: any[] = [{ "Descricao": "BMW" }, { "Descricao": "Mercedez Bens" }, { "Descricao": "Toyota" }];
  public Modelos: any[] = [{ "Descricao": "X1" }, { "Descricao": "C180" }, { "Descricao": "XEI" }];
  public Versoes: any[] = [{ "Descricao": "TURBO ACTIVE XDRIVE25I SPORT" }, { "Descricao": "CGI AVANTGARDE 7G-TRONIC" }, { "Descricao": "XEI 1.8 Aut. Gasolina" }];

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

  public filtersData: any;

  constructor(
    private router: Router,
    private loaderCtrl: LoaderComponent,
    private platform: Platform,
    private alertCtrl: AlertComponent,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private nav: NavController,
    @Inject('LocalStorageRepositoryToken') private localStorageRepository: ILocalStorageRepository,
    @Inject('VeiculoOfertaServiceToken') private veiculoOfertaService: IVeiculoOfertaService) {


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

    this.filtersData = {
      "step1": {
        "status": "1"
      },
      "step2": {
        "companyId": this.rlUser.companyId,
        "userId": this.rlUser.userId,
        "perimeters": null
      },
      "step3": {
        "price": { "min": null, "max": null },
        "year": { "min": null, "max": null },
        "blend": null,
        "model": null
      }
    };

  }

  ionViewDidEnter() {

    this.filtersData = {
      "step1": {
        "status": "1"
      },
      "step2": {
        "companyId": this.rlUser.companyId,
        "userId": this.rlUser.userId,
        "perimeters": null
      },
      "step3": {
        "price": { "min": null, "max": null },
        "year": { "min": null, "max": null },
        "blend": null,
        "model": null
      }
    };

    this.doRefresh(null);

  }

  async carregarRefresh(refresher: any) {


    this.carregando = true;

    this.platform.ready().then(() => {

      this.veiculoOfertaService.getOffers(this.filtersData)
        .then((result: any) => {

          this.carregando = false;
          if (result) {
            this.offers = result || [];
            this.ordenar();
          }
          if (refresher)
            refresher.target.complete();

        })
        .catch((e: any) => {
          this.carregando = false;
          if (refresher)
            refresher.target.complete();
          this.alertCtrl.showAlert('RepassAuto - Ofertas', `Erro ao carregar as Ofertas.`);
        });
    });

  }

  async verTodosDados(offer: any) {

    let attemption = '<b>Atenção!</b><br> A visualização dos dados completos, gera uma tarifa de: <br> <b>R$ 20,00</b><br><br>';
    attemption += 'Será debitado do cartão da Agência.<br><br>';
    attemption += 'Tem certeza?';

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
            let navigationExtras: NavigationExtras = { state: { offer } };
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
    this.carregarRefresh(refresher);
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


  async openFilters(opts = {}) {


    const modal = await this.modalCtrl.create({
      component: FiltersComponent,
      componentProps: { "filtersData": this.filtersData },
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.5
    });


    modal.onDidDismiss()
      .then((returnedData) => {

        console.log('----modal.onDidDismiss------', returnedData);
        if (returnedData.data) {
          this.filtersData = returnedData.data;
        } 
        else {
          this.filtersData = {
            "step1": {
              "status": "1"
            },
            "step2": {
              "companyId": this.rlUser.companyId,
              "userId": this.rlUser.userId,
              "perimeters": null
            },
            "step3": {
              "price": { "min": null, "max": null },
              "year": { "min": null, "max": null },
              "blend": null,
              "model": null
            }
          }
        }
        this.doRefresh(null);
      })
      .catch((error: any) => {

        console.log('----error modal.onDidDismiss------', error);

      });


    await modal.present();

  }


}






