import { Component, Inject } from '@angular/core';
import { ModalController, NavController, NavParams, Platform } from '@ionic/angular';
import { ILocalStorageRepository } from 'src/repository/interfaces/ILocalStorageRepository';
import { IPerimetroService } from 'src/services/interfaces/IPerimetroService';
import { AlertComponent } from '../alert/alert';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})

export class FiltersComponent {

  public rlUser: any;

  public perimeters: any[];
  public aPerimeters: any[] = [];
  public filtersData: any = {
    "step1": {
      "status": "1"
    },
    "step2": {
      "companyId": null,
      "userId": null,
      "perimeters": null
    },
    "step3": {
      "price": { "min": null, "max": null },
      "year": { "min": null, "max": null },
      "blend": null,
      "model": null
    }
  }


  perimeterOptions: any = {
    header: 'Perímetros',
    subHeader: 'Selecione um ou mais Perímetros',
  };


  constructor(
    public platform: Platform,
    public navParams: NavParams,
    public alertCtrl: AlertComponent,
    public modalCtrl: ModalController,
    public navCtrl: NavController,

    @Inject('LocalStorageRepositoryToken') private localStorageRepository: ILocalStorageRepository,
    @Inject('PerimetroServiceToken') private perimetroService: IPerimetroService) {

    let rlUser = this.localStorageRepository.recuperaConfiguracaoPorChave('rlUser');
    if (rlUser) {
      this.rlUser = JSON.parse(rlUser);
    }
    this.filtersData = this.navParams.get('filtersData');


  }




  ionViewDidEnter() {
    this.carregar();
  }


  carregar() {

    this.perimetroService.getAll(this.rlUser.companyId, this.rlUser.userId)
      .then((result: any) => {

        if (result) {
          this.perimeters = result;
          this.aPerimeters = result;
        }

      })
      .catch((e: any) => {
        console.log('Erro:', e);
      });


  }

  filtrar() {

    console.log('---returnedData----', this.filtersData);
    this.modalCtrl.dismiss(this.filtersData);
  }

}