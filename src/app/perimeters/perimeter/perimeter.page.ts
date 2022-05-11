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

  public perimeterId: string = "";
  public perimeter: PerimetroDto = new PerimetroDto();


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loaderCtrl: LoaderComponent,
    private platform: Platform,
    private alertCtrl: AlertComponent,
    private alertController: AlertController,
    public nav: NavController,
    @Inject('LocalStorageRepositoryToken') private localStorageRepository: ILocalStorageRepository,
    @Inject('PerimetroServiceToken') private perimetroService: IPerimetroService ) {

      this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.perimeterId = this.router.getCurrentNavigation().extras.state.perimeterId || "";
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
    this.initializeConfiguration();
    this.inputRange.setFocus();
  }




  initializeConfiguration() {

    this.platform.ready().then(() => {



    });

  }


  async goBack() {

    this.nav.navigateBack('/perimeters');

  }


  async salvar() {

    }








}
