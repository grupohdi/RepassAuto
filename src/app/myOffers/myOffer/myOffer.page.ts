import { Component, Inject, OnInit, ViewChildren, ViewChild, QueryList } from '@angular/core';
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
import { ComponentsModule } from 'src/components/components.module';
import { ToastComponent } from 'src/components/toast/toast';


@Component({
  selector: 'app-myOffer',
  templateUrl: './myOffer.page.html',
  styleUrls: ['./myOffer.page.scss'],
})

export class MyOfferPage implements OnInit {
  @ViewChildren('items') items: QueryList<any>;

  public logged: any;
  public rlUser: any;
  public company: any;

  public myOffer: VeiculoOfertaDto = new VeiculoOfertaDto();
  public vehicles: any[] = new Array(new VeiculoDto());
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

  vehicleDescription: string = "";
  statusDescription: string = "";
  statusOld: any = "0";


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loaderCtrl: LoaderComponent,
    private platform: Platform,
    private alertCtrl: AlertComponent,
    private alertController: AlertController,
    public nav: NavController,
    public toast: ToastComponent,
    @Inject('LocalStorageRepositoryToken') private localStorageRepository: ILocalStorageRepository,
    @Inject('VeiculoServiceToken') private veiculoService: IVeiculoService,
    @Inject('VeiculoOfertaServiceToken') private veiculoOfertaService: IVeiculoOfertaService) {


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

    this.route.queryParams.subscribe(params => {

      this.myOffer.createdAt = new Date();
      this.myOffer.userId = this.rlUser.userId;


      if (this.router.getCurrentNavigation().extras.state) {
        this.myOffer = this.router.getCurrentNavigation().extras.state.myOffer;
      }

      if (this.myOffer.id !== "") {
        this.btnSave = "Salvar";
      }



    }, (error) => {
      console.error("VehiclePage - Erro ", error);
    });

  }

  async ngOnInit() {
  }



  async ionViewDidEnter() {
    this.preencherVeiculos();
  }


  async preencherVeiculos() {

    this.loaderCtrl.showLoader('Preenchendo Lista de Veículos...');

    await this.veiculoService.getMyVehicle(this.rlUser.companyId, this.rlUser.userId)
      .then(async (result: VeiculoDto[]) => {

        this.loaderCtrl.hiddenLoader();
        if (result) {
          this.vehicles = result;


          this.vehicles.map(vehicle => {
            if (vehicle.id == this.myOffer.veiculoId) {
              this.vehicleDescription = `PLACA: ${vehicle.placa} ${vehicle.marcaDescricao} ${vehicle.modeloDescricao}`;

              this.statusOld = this.myOffer.status;
              if (this.myOffer.status > "1") {
                this.statusDescription = this.statusOptions[this.myOffer.status - 1].Label;
              }
            }
          });
        }

      })
      .catch((e: any) => {
        this.loaderCtrl.hiddenLoader();
        this.alertCtrl.showAlert('RepassAuto - Minhas Ofertas', `Erro ao preencher o veículo.`);
      });

  }


  async goBack() {

    this.nav.navigateBack('/myOffers');

  }

  async confirmSave() {

    if (this.myOffer.veiculoId.trim() === "") {
      this.toast.showToastBottom(`Escolha um veículo`, 2000);
      this.items[0].setFocus();
      return false;
    }

    if (this.myOffer.status.trim() === "") {
      this.toast.showToastBottom(`Informe o Status`, 2000);
      this.items[1].setFocus();
      return false;
    }

    let attemption = '<b>Atenção!</b><br>';
       attemption +=  'Tem certeza?';

    const alert = await this.alertController.create({
      subHeader: 'RepassAuto - Minha Oferta',
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
            this.save();
                  }
        }
      ]
    });
    await alert.present();


  }
  async save() {


    console.log("-------this.myOffer------------", this.myOffer);

    let msgLoader = "Gerando nova Oferta...";
    if (this.myOffer.id != "") {
      msgLoader = "Salvando Oferta...";
    }
    this.loaderCtrl.showLoader(msgLoader);


    this.veiculoOfertaService.save(this.myOffer)
      .then((result: any) => {


        if (result) {
          this.myOffer = result;
        }

        this.loaderCtrl.hiddenLoader();
        this.goBack();

      })
      .catch((e: any) => {
        this.loaderCtrl.hiddenLoader();
        this.alertCtrl.showAlert('RepassAuto - Minha Oferta', `Erro.`);
      });

  }




}
