import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AlertComponent } from '../../../components/alert/alert';
import { LoaderComponent } from '../../../components/loader/loader';
import { ILocalStorageRepository } from '../../../repository/interfaces/ILocalStorageRepository';
import { IPerimetroService } from '../../../services/interfaces/IPerimetroService';
import { IFipeService } from '../../../services/interfaces/IFipeService';
import { PerimetroDto } from '../../../dto/PerimetroDto';
import { ActivatedRoute } from '@angular/router';
import { ToastComponent } from 'src/components/toast/toast';

@Component({
  selector: 'app-perimeter',
  templateUrl: './perimeter.page.html',
  styleUrls: ['./perimeter.page.scss'],
})

export class PerimeterPage implements OnInit {
  @ViewChild('inputRange') inputRange: any;
  @ViewChild('inputLatitude') inputLatitude: any;
  @ViewChild('inputLongitude') inputLongitude: any;

  public logged: any;
  public rlUser: any;
  public company: any;

  public perimeter: PerimetroDto = new PerimetroDto();


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
    @Inject('PerimetroServiceToken') private perimetroService: IPerimetroService) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.perimeter = this.router.getCurrentNavigation().extras.state.perimeter;
      }

    }, (error) => {
      console.error("PerimeterPage - Erro ", error);
    });

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

  }

  ionViewDidEnter() {
    this.carregar();
  }




  async goBack() {

    this.nav.navigateBack('/perimeters');

  }


  async carregar() {

    this.platform.ready().then(async () => {

      this.loaderCtrl.showLoader('Carregando...');
      if (this.perimeter.id != "") {

        await this.perimetroService.getById(this.perimeter.id)
        .then ((result:any) => {

          this.loaderCtrl.hiddenLoader();

          if (result) {
              this.perimeter = result;
          }

        })
        .catch((e: any) => {
          this.loaderCtrl.hiddenLoader();
          this.alertCtrl.showAlert('RepassAuto - Perímetros', `Erro ao carregar o perímetro.`);
        });
  
      }

    });

  }

  async salvar() {


    if (this.perimeter.range.trim() == "") {
      this.toast.showToastBottom(`Informe o Range em kms`, 2000);
      this.inputRange.setFocus();
      return false;
    }
    if (this.perimeter.latitude.trim() == "") {
      this.toast.showToastBottom(`Informe a Latitude`, 2000);
      this.inputLatitude.setFocus();
      return false;
    }
    if (this.perimeter.longitude.trim() == "") {
      this.toast.showToastBottom(`Informe a Longitude`, 2000);
      this.inputLongitude.setFocus();
      return false;
    }

    this.loaderCtrl.showLoader('Salvando...');

      await this.perimetroService.save(this.perimeter)
      .then ((result:any) => {

        this.loaderCtrl.hiddenLoader();
        this.goBack();

      })
      .catch((e: any) => {
        this.loaderCtrl.hiddenLoader();
        this.alertCtrl.showAlert('RepassAuto - Perímetros', `Erro ao carregar o perímetro.`);
      });

}







}
