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

import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { stringify } from 'querystring';

@Component({
  selector: 'app-vehicle-full',
  templateUrl: './vehicle-full.page.html',
  styleUrls: ['./vehicle-full.page.scss'],
})

export class VehicleFullPage implements OnInit {

  public logged: any;
  public rlUser: any;
  public company: any;
  public offer: any;
  public activeIndexSwiper: number = 0;
  public config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 15,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
    zoom: true,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loaderCtrl: LoaderComponent,
    private platform: Platform,
    private alertCtrl: AlertComponent,
    private alertController: AlertController,
    public nav: NavController,
    private socialSharing: SocialSharing,
    @Inject('LocalStorageRepositoryToken') private localStorageRepository: ILocalStorageRepository,
    @Inject('VeiculoServiceToken') private veiculoService: IVeiculoService,
    @Inject('VeiculoFotoServiceToken') private veiculoFotoService: IVeiculoFotoService) {

      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.offer = this.router.getCurrentNavigation().extras.state.offer;
        }
      }, (error) => {
        console.error("VehicleFullPage - Erro ", error);
      });
  
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

  ngOnInit() {

  }

  ionViewDidEnter() {

  }


  onSlideChange([swiper]) {
    this.activeIndexSwiper = swiper.activeIndex;
    console.log('slide change', swiper.activeIndex);
  }

  async goBack() {

    this.nav.navigateRoot('/offers');

  }

  async share() {

    let image = this.offer.veiculoFotos[0].base64;
    let url = "";
    let data: string = `\n\n
    Agência/Concessionária:\n
    ${this.offer.company.razaoSocial}\n
    Contato:\n
    ${this.offer.company.contato} \n
    ${this.offer.company.telefone} \n
    ______________________\n\n

    Vendedor:\n
    ${this.offer.vendedor.name} \n
    ${this.offer.vendedor.mail} \n
    ${this.offer.vendedor.phone}\n
    ______________________\n\n

    FIPE: \n
    Ref.: ${this.offer.veiculo.referenciaDescricao} \n
    Cód.: ${this.offer.veiculo.codigoFipe} \n
    Valor: ${this.offer.veiculo.valorFipe} \n
     
    ______________________\n\n

    Veículo:\n
    Preço: *${ (!!this.offer.veiculo.preco) ? (this.offer.veiculo.preco*1).toLocaleString('pt-BR', {minimumFractionDigits: 2 , style: 'currency', currency: 'BRL'}) : 0}* \n
    Marca: ${this.offer.veiculo.marcaDescricao} \n
    Modelo: ${this.offer.veiculo.modeloDescricao} \n
    Ano Modelo: ${this.offer.veiculo.anoFabricacao} 
    Ano Fabricação: ${this.offer.veiculo.anoModeloDescricao} \n
    Kms: ${this.offer.veiculo.kms} \n
    Cor: ${this.offer.veiculo.cor} \n
    Placa: *${this.offer.veiculo.placa}* \n\n
    Descrição: ${this.offer.veiculo.descricao} \n\n
    `;

    // Check if sharing via email is supported
    this.socialSharing.shareViaWhatsApp(data,image, url).then(() => {
      // Sharing via email is possible
      console.log('socialSharing OK');
    }).catch((error) => {
      // Sharing via email is not possible
      console.log('socialSharing erro:', error);
    });

  }

}
