import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AlertComponent } from '../../../components/alert/alert';
import { LoaderComponent } from '../../../components/loader/loader';
import { ILocalStorageRepository } from '../../../repository/interfaces/ILocalStorageRepository';
import { IUserService } from '../../../services/interfaces/IUserService';
import { IFipeService } from '../../../services/interfaces/IFipeService';
import { IVeiculoFotoService } from '../../../services/interfaces/IVeiculoFotoService';
import { UserDto } from '../../../dto/userDto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})

export class UserPage implements OnInit {
  @ViewChild('inputName') inputName: any;
  @ViewChild('inputMail') inputMail: any;
  @ViewChild('inputPhone') inputPhone: any;
  @ViewChild('inputPassword') inputPassword: any;
  @ViewChild('selectRole') selectRole: any;

  public logged: any;
  public rlUser: any;
  public company: any;

  public Roles: any[] = [{"role":"platform_manager_access"}, {"role":"platform_user_access"}];
  public mensagemEmail: string = "Informe um email ainda não usado no RepassAuto...";
  public email: boolean = false;
  public userId: string = "";
  public user: UserDto = new UserDto();

  functionActionSheetOptions: any = {
    header: 'Função do usuário',
    subHeader: 'Selecione a função',
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
    @Inject('UserServiceToken') private userService: IUserService) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.userId = this.router.getCurrentNavigation().extras.state.userId || "";
      }

    }, (error) => {
      console.error("UserPage - Erro ", error);
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
    this.inputName.setFocus();

  }



  async initializeConfiguration() {

    this.platform.ready().then( async() => {

    await this.obterUsuario();


  });

  }


  async goBack() {

    this.nav.navigateBack('/users');

  }




  async obterUsuario() {

    if ( this.userId.trim() !== "") {

      this.loaderCtrl.showLoader(`Aguarde, obtendo dados do Usuário...`);

      this.userService.obterPorId(this.userId)
          .then((result: any) => {

            this.loaderCtrl.hiddenLoader();

            if (result) {
              this.user = result ;

            }
          })
          .catch((e: any) => {
            this.loaderCtrl.hiddenLoader();
            this.alertCtrl.showAlert('RepassAuto - Usuários', `Erro ao carregar os Usuários.`);
          });

      }
      else {

        this.user = new UserDto();
      }



  }


  async salvar() {


    if (this.user.name.trim() === "" ) {
      this.alertCtrl.showAlert('RepassAuto - Usuários', `Informe o Nome`);
      this.inputName.setFocus();

    }
    else if (this.user.mail.trim() === "" ) {
      this.alertCtrl.showAlert('RepassAuto - Usuários', `Informe o e-mail`);
      this.inputMail.setFocus();

    }
    else if (this.user.phone.trim() === "" ) {
      this.alertCtrl.showAlert('RepassAuto - Usuários', `Informe o telefone`);
      this.inputPhone.setFocus();

    }
    else if (this.user.password.trim() === "" ) {
      this.alertCtrl.showAlert('RepassAuto - Usuários', `Informe a senha`);
      this.inputPassword.setFocus();

    }
    else if (this.user.role.trim() === "" ) {
      this.alertCtrl.showAlert('RepassAuto - Usuários', `Informe a função`);
      this.selectRole.setFocus();
    }


    let temEmail = [];
    if ( this.user.id == null) {
       temEmail = await this.userService.obterPorEmail(this.user.mail);
       console.log('-------------------temEmail------------------');
       console.log(temEmail);
    }

    if (temEmail.length >0 && this.user.id == null) {
      this.mensagemEmail = "Atenção, esse memail já existe. Por favor, cadastre outro e-mail.";
      this.email = false;
      return false;
    }
    else {
      this.mensagemEmail = "E-Mail válidado com sucesso.";
      this.email = true;

      this.loaderCtrl.showLoader(`Aguarde, salvando dados do Usuário...`);

      this.userService.salvar(this.user)
      .then((result: any) => {

        this.loaderCtrl.hiddenLoader();

        if (result) {
          this.user = result ;
        }
      })
      .catch((e: any) => {
        this.loaderCtrl.hiddenLoader();
        this.alertCtrl.showAlert('RepassAuto - Usuários', `Erro ao salvar  Usuários`);
      });

    }





    }




}
