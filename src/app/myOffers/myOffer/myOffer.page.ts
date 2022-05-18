import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AlertComponent } from '../../../components/alert/alert';
import { LoaderComponent } from '../../../components/loader/loader';
import { ILocalStorageRepository } from '../../../repository/interfaces/ILocalStorageRepository';
import { IVeiculoService } from '../../../services/interfaces/IVeiculoService';
import { IVeiculoOfertaService } from '../../../services/interfaces/IVeiculoOfertaService';
import { VeiculoDto } from '../../../dto/VeiculoDto';
import { VeiculoFotoDto } from '../../../dto/VeiculoFotoDto';
import { VeiculoOfertaDto } from '../../../dto/VeiculoOfertaDto';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-myOffer',
  templateUrl: './myOffer.page.html',
  styleUrls: ['./myOffer.page.scss'],
})

export class MyOfferPage implements OnInit {

  public logged: any;
  public rlUser: any;
  public company: any;

  public myOffer: VeiculoOfertaDto = new VeiculoOfertaDto();
  public vehicles: any[];
  public btnSave: string = "Gerar Oferta";
  public statusOptions: any[] = [
    { "Label": "Ativo", "Value": "1" },
    { "Label": "Em Negociação", "Value": "2" },
    { "Label": "Repassado", "Value": "3" },
    { "Label": "Cancelada", "Value": "4" }
  ];


  vehiclesActionSheetOptions: any = {
    header: 'Veículos',
    subHeader: 'Selecione o Veículo',
  };

  statusActionSheetOptions: any = {
    header: 'Status',
    subHeader: 'Selecione o Status',
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
    @Inject('VeiculoOfertaServiceToken') private veiculoOfertaService: IVeiculoOfertaService) {


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

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.myOffer = this.router.getCurrentNavigation().extras.state.myOffer;
      }
      this.myOffer.userId = this.rlUser.userId;

    }, (error) => {
      console.error("VehiclePage - Erro ", error);
    });






  }

  ngOnInit() {
  }



  ionViewDidEnter() {


    this.preencherVeiculos();

    if(this.myOffer.id !== "") {
      this.btnSave = "Salvar";
    }

  }

  preencherVeiculos() {

    this.platform.ready()
      .then(async () => {


        this.veiculoService.getMyVehicle(this.rlUser.companyId, this.rlUser.userId)
          .then(async (result: any) => {

            this.loaderCtrl.hiddenLoader();

            if (result) {
              this.vehicles = result;
            }
          })
          .catch((e: any) => {
            this.loaderCtrl.hiddenLoader();
            this.alertCtrl.showAlert('RepassAuto - Minhas Ofertas', `Erro ao preencher o veículo.`);
          });
      });

  }


  async goBack() {

    this.nav.navigateBack('/myOffers');

  }

  async salvar() {


    console.log("-------this.myOffer.id------------", (this.myOffer.id == ""));

    let msgLoader = "Gerando nova Oferta...";
    if (this.myOffer.id == "") {
      msgLoader = "Salvando Oferta...";
    }
    this.loaderCtrl.showLoader(msgLoader);


    this.veiculoOfertaService.save(this.myOffer)
      .then((result: any) => {

        this.loaderCtrl.hiddenLoader();

        if (result) {
          this.myOffer = result;
        }

      })
      .catch((e: any) => {
        this.loaderCtrl.hiddenLoader();
        this.alertCtrl.showAlert('RepassAuto - Minha Oferta', `Erro.`);
      });

  }




}
