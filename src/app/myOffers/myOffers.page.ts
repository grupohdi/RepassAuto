import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AlertComponent } from '../../components/alert/alert';
import { LoaderComponent } from '../../components/loader/loader';

import { ILocalStorageRepository } from '../../repository/interfaces/ILocalStorageRepository';
import { IVeiculoService } from '../../services/interfaces/IVeiculoService';
import { IVeiculoOfertaService } from '../../services/interfaces/IVeiculoOfertaService';
import { VeiculoFotoDto } from 'src/dto/VeiculoFotoDto';

import SwiperCore, { SwiperOptions, Autoplay, Keyboard, Pagination, Navigation, Scrollbar, A11y, Zoom } from 'swiper';
import { VeiculoOfertaDto } from 'src/dto/VeiculoOfertaDto';
SwiperCore.use([Autoplay, Navigation, Keyboard, Pagination, Scrollbar, A11y, Zoom]);

@Component({
  selector: 'app-myOffers',
  templateUrl: './myOffers.page.html',
  styleUrls: ['./myOffers.page.scss'],
})

export class MyOffersPage implements OnInit {

  public logged: any;
  public rlUser: any;
  public company: any;
  public myOffers: any[];
  public carregando: string = "Carregando as minhas ofertas...";
  public mode: any;

  public photoNotAvailable: string = "data:image/png;base64,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";
  public fotoNaoDisponivel: VeiculoFotoDto[];

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
    private route: ActivatedRoute,
    private loaderCtrl: LoaderComponent,
    private platform: Platform,
    private alertCtrl: AlertComponent,
    private alertController: AlertController,
    public nav: NavController,
    @Inject('LocalStorageRepositoryToken') private localStorageRepository: ILocalStorageRepository,
    @Inject('VeiculoServiceToken') private veiculoService: IVeiculoService,
    @Inject('VeiculoOfertaServiceToken') private veiculoOfertaService: IVeiculoOfertaService) {


    this.route.queryParams.subscribe((params) => {
      if (params) {
        this.mode = params;
        console.log('mode----->', this.mode);
      }
    });


  }

  async ngOnInit() {

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

    //this.carregar();
  }


  ionViewDidEnter() {

    this.carregar();

  }

  async carregar() {

    this.platform.ready().then(async () => {

      this.loaderCtrl.showLoader(`Carregando...`);
      let dto = new VeiculoFotoDto();
      dto.base64 = this.photoNotAvailable;
      this.fotoNaoDisponivel = [dto];

      this.veiculoOfertaService.getByUser(this.rlUser.userId)
        .then((result: any) => {

          // console.log('---------veiculoOfertaService--------------------');
          // console.log(result);

          if (result) {
            this.myOffers = result;

            this.ordenar();
          }
          else {
            this.carregando = "Nenhuma oferta cadastrada.";
          }
          this.loaderCtrl.hiddenLoader();

        })
        .catch((error: any) => {

          this.carregando = "Nenhuma oferta cadastrada.";

          this.loaderCtrl.hiddenLoader();
          this.alertCtrl.showAlert('RepassAuto - Meus Veículos', `Erro ao carregar os veículos. `);
        });

    });
  }

  carregarRefresh(refresher: any) {

    this.veiculoOfertaService.getByUser(this.rlUser.userId)
      .then((result: any) => {

        if (result) {
          this.myOffers = result;
          this.ordenar();
        }
        else {
          this.carregando = "Nenhuma oferta cadastrada.";
        }

        if (refresher)
          refresher.target.complete();

      })
      .catch((error: any) => {

        if (refresher)
          refresher.target.complete();

        this.carregando = "Nenhuma oferta cadastrada.";
        this.alertCtrl.showAlert('RepassAuto - Minhas Ofertas', `Erro ao carregar.`);

      });

  }



  async abrir(myOffer: any) {

    if (myOffer == undefined) {
      myOffer = new VeiculoOfertaDto();
      myOffer.userId = this.rlUser.userId;
    }
    let navigationExtras: NavigationExtras = { state: { "myOffer": myOffer } };
    this.router.navigate(['/myOffers/myOffer'], navigationExtras);


  }



  async doRefresh(refresher) {
    this.carregarRefresh(refresher);
  }

  async ordenar() {
    this.myOffers.sort(function (a, b) {
      if (a.createdAt > b.createdAt)
        return -1;
      if (a.createdAt < b.createdAt)
        return 1;
      return 0;
    });
  }


  status(stat: any) {
    const statusOptions: any[] = [
      { "Label": "Ativo", "Value": "1" },
      { "Label": "Em Negociação", "Value": "2" },
      { "Label": "Repassado", "Value": "3" },
      { "Label": "Cancelada", "Value": "4" }
    ];

    return statusOptions[stat - 1].Label;
  }

}