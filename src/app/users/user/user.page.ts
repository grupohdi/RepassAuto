import { Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AlertComponent } from '../../../components/alert/alert';
import { LoaderComponent } from '../../../components/loader/loader';
import { ILocalStorageRepository } from '../../../repository/interfaces/ILocalStorageRepository';
import { IUserService } from '../../../services/interfaces/IUserService';
import { UserDto } from '../../../dto/userDto';
import { ActivatedRoute } from '@angular/router';
import { ToastComponent } from '../../../components/toast/toast';


@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})

export class UserPage implements OnInit {
  @ViewChildren('items') public items: QueryList<any>;

  public logged: any;
  public rlUser: any;
  public company: any;

  public roles: any[] = [{ "role": "platform_manager_access", "description": "Gerente" }, { "role": "platform_user_access", "description": "Vendedor" }];
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
    public toast: ToastComponent,
    @Inject('LocalStorageRepositoryToken') private localStorageRepository: ILocalStorageRepository,
    @Inject('UserServiceToken') private userService: IUserService) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.user = this.router.getCurrentNavigation().extras.state.user;
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
    if (rlUser) {
      this.rlUser = JSON.parse(rlUser);
    }
    let company = this.localStorageRepository.recuperaConfiguracaoPorChave('company');
    if (company) {
      this.company = JSON.parse(company);
    }

    this.obterUsuario();

  }

  ionViewDidEnter() {
    this.obterUsuario();
  }


  async goBack() {

    this.nav.navigateBack('/users');

  }

  async obterUsuario() {

    this.platform.ready().then(async () => {

      if (this.user.id.trim() !== "") {

        this.loaderCtrl.showLoader(`Carregando...`);

        this.userService.obterPorId(this.userId)
          .then((result: any) => {

            this.loaderCtrl.hiddenLoader();

            if (result) {
              this.user = result;
              this.user.password = "";

            }
          })
          .catch((e: any) => {
            this.loaderCtrl.hiddenLoader();
            this.alertCtrl.showAlert('RepassAuto - Usuários', `Erro ao carregar os Usuários.`);
          });

      }

    });

  }


  async salvar() {


    if (this.user.name.trim() === "") {
      this.toast.showToastBottom('Informe o Nome.', 2000);
      this.items.toArray()[0].setFocus();
      return false;
    }
    if (this.user.mail.trim() === "") {
      this.toast.showToastBottom('Informe o e-mail.', 2000);
      this.items.toArray()[1].setFocus();
      return false;
    }
    if (this.user.phone.trim() === "") {
      this.toast.showToastBottom('Informe o telefone.', 2000);
      this.items.toArray()[2].setFocus();
      return false;
    }
    if (this.user.password.trim() === "") {
      this.toast.showToastBottom('Informe a senha.', 2000);
      this.items.toArray()[3].setFocus();
      return false;
    }
    if (this.user.role.trim() === "") {
      this.toast.showToastBottom('Informe a função.', 2000);
      this.items.toArray()[4].setFocus();
      return false;

    }

    this.loaderCtrl.showLoader(`Salvando...`);

    this.userService.salvar(this.user)
      .then((result: any) => {


        if (result) {
          this.user = result;
        }

        this.loaderCtrl.hiddenLoader();
        this.goBack();

      })
      .catch((e: any) => {
        this.loaderCtrl.hiddenLoader();
        this.alertCtrl.showAlert('RepassAuto - Usuários', `Erro ao salvar  Usuários`);
      });

  }

  onKeyPressed(event, index) {

    if (event.keyCode == 13) {
      if (index + 1 == 4) {
        this.items.toArray()[index + 1].setFocus();
      }
      else {
        this.items.toArray()[index + 1].setFocus();
      }
    }


    return true;
  }

  async userVerify() {

    if (this.user.id == "") {

      if (!this.isEmail(this.user.mail.trim())) {

        this.toast.showToastBottom('E-MAIL Inválido!', 1500);
        this.user.mail = "";
        this.items.toArray()[1].setFocus();
        return false;
      }


      await this.userService.obterPorEmail(this.user.mail.trim())
        .then((response) => {

          if (response) {
            if (response.mail.trim() == this.user.mail.trim()) {

              this.toast.showToastBottom('O <b>E-Mail</b> informado já foi usado! ', 3000);
              this.user.mail = "";
              this.items.toArray()[1].setFocus();
              return false;
            }
            else {
              this.toast.showToastTop('O <b>E-Mail</b> pode ser usado. OK ', 3000);
              return true;
            }

          }
          else {
            this.toast.showToastTop('O <b>E-Mail</b> pode ser usado. OK ', 3000);
            return true;
          }

        });

    }
  }

  isEmail(search: string): boolean {
    let serchfind: boolean = false;

    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    serchfind = regexp.test(search);

    return serchfind;
  }




}
