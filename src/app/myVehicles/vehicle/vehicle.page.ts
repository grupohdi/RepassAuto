import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AlertComponent } from '../../../components/alert/alert';
import { LoaderComponent } from '../../../components/loader/loader';
import { ILocalStorageRepository } from '../../../repository/interfaces/ILocalStorageRepository';
import { IVeiculoService } from '../../../services/interfaces/IVeiculoService';
import { IVeiculoFotoService } from '../../../services/interfaces/IVeiculoFotoService';
import { VeiculoFotoDto } from '../../../dto/VeiculoFotoDto';
import { ActivatedRoute } from '@angular/router';

import SwiperCore, { SwiperOptions, Autoplay, Keyboard, Pagination, Navigation, Scrollbar, A11y, Zoom } from 'swiper';
SwiperCore.use([Autoplay, Navigation, Keyboard, Pagination, Scrollbar, A11y, Zoom]);

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.page.html',
  styleUrls: ['./vehicle.page.scss'],
})

export class VehiclePage implements OnInit {

  public logged: any;
  public rlUser: any;
  public company: any;
  public vehicle: any;
  public activeIndexSwiper: number = 0;
  public config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 15,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
    zoom: true,
  };

  public Marcas: any[] = [{"Descricao":"BMW"},{"Descricao":"Mercedez Bens"},{"Descricao":"Toyota"}];
  public Modelos: any[] = [{"Descricao":"X1"},{"Descricao":"C180"},{"Descricao":"XEI"}];
  public Versoes: any[]= [{"Descricao":"TURBO ACTIVE XDRIVE25I SPORT"},{"Descricao":"CGI AVANTGARDE 7G-TRONIC"},{"Descricao":"XEI 1.8 Aut. Gasolina"}];

  tipoActionSheetOptions: any = {
    header: 'Tipos de automóveis',
    subHeader: 'Selecione o tipo',
    cssClass: 'my-custom-interface'
    };

  marcaActionSheetOptions: any = {
    header: 'Marcas',
    subHeader: 'Selecione a Marca',
    cssClass: 'my-custom-interface'
  };

  modeloActionSheetOptions: any = {
    header: 'Modelos',
    subHeader: 'Selecione o Modelo',
    cssClass: 'my-custom-interface'
  };
  versaoActionSheetOptions: any = {
    header: 'Versões',
    subHeader: 'Selecione a  Versão',
    cssClass: 'my-custom-interface'
  };

  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loaderCtrl: LoaderComponent,
    private platform: Platform,
    private alertCtrl: AlertComponent,
    private alertController: AlertController,
    public nav: NavController,
    @Inject('LocalStorageRepositoryToken') private localStorageRepository: ILocalStorageRepository,
    @Inject('VeiculoServiceToken') private veiculoService: IVeiculoService,
      @Inject('VeiculoFotoServiceToken') private veiculoFotoService: IVeiculoFotoService) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.vehicle = this.router.getCurrentNavigation().extras.state.vehicle;
      }
    }, (error) => {
      console.error("VehiclePage - Erro ", error);
    });

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

  }

  ionViewDidEnter() {
    this.initializeConfiguration();
  }


  onSlideChange([swiper]) {
    this.activeIndexSwiper = swiper.activeIndex;
    console.log('slide change',swiper.activeIndex);
  }


initializeConfiguration() {

    this.platform.ready().then(() => {


      if (!this.vehicle) {
        this.loaderCtrl.showLoader(`Aguarde, carregando meus veículos...`);
        this.veiculoService.getById(this.vehicle.id)
          .then((result: any) => {

            console.log(result);
            this.loaderCtrl.hiddenLoader();

            if (result) {
              this.vehicle = result;

            }
          })
          .catch((e: any) => {
            this.loaderCtrl.hiddenLoader();
            this.alertCtrl.showAlert('RepassAuto - Meus Veículos', `Erro ao carregar os veículos.`);
          });
      }

    });

  }


  async goBack() {

    this.nav.navigateBack('/myVehicles');

  }

  preencheModelo() {

    //

  }

  preencheVersao() {

    //

  }



  async tiraFoto() {

    this.veiculoFotoService.tiraFoto(this.vehicle.id)
    .then((veiculoFotoDto: VeiculoFotoDto) => {

      this.loaderCtrl.showLoader(`Enviando a foto...`);

      if (veiculoFotoDto) {
        this.veiculoFotoService.tryEnviarFoto(veiculoFotoDto)
        .then((result: any) => {

          if (result) {
            this.vehicle.veiculoFotos.push(veiculoFotoDto);
          }
          this.loaderCtrl.hiddenLoader();

        })
        .catch((e: any) => {
          console.log('erro:',e);
          this.loaderCtrl.hiddenLoader();
          this.alertCtrl.showAlert('RepassAuto - Veículo', `Erro ao enviar  a foto.`);
        });
      }

    })
    .catch((e: any) => {
      this.alertCtrl.showAlert('RepassAuto - Veículo', `Erro ao tirar a foto.`);
    });
}


  async apagaFoto() {

    console.log('activeIndexSwiper',this.activeIndexSwiper);
    console.log('vehicle id:',this.vehicle.veiculoFotos[this.activeIndexSwiper].id);

    const alert = await this.alertController.create({
      subHeader: 'RepassAuto - Fotos',
      message: 'Tem certeza que deseja excluir essa foto?',
      cssClass: 'alert-warning',
      buttons: [
        {
          text: 'Sim',
          role: 'cancel',
          handler: () => {
            console.log('Sim');

            this.loaderCtrl.showLoader(`Aguarde, apagando a foto...`);

            let veiculoFotoId = this.vehicle.veiculoFotos[this.activeIndexSwiper].id;
            this.veiculoFotoService.tryExcluirFoto(veiculoFotoId)
              .then((result: any) => {

                if (result) {
                  this.vehicle.veiculoFotos.splice(this.activeIndexSwiper,1);
                }
                console.log('result tryExcluirFoto',result);
                this.loaderCtrl.hiddenLoader();
    
              })
              .catch((e: any) => {
                console.log('erro:',e);
                this.loaderCtrl.hiddenLoader();
                this.alertCtrl.showAlert('RepassAuto - Veículo', `Erro ao apagar  a foto.`);
              });
    

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
