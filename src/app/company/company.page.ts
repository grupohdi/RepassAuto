import { Component, OnInit, ViewChildren, QueryList, Inject, Injectable, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertController, NavParams, Platform, ToastController } from '@ionic/angular';
import { AlertComponent } from '../../components/alert/alert';
import { LoaderComponent } from '../../components/loader/loader';
import { ToastComponent } from '../../components/toast/toast';
import { ILocalStorageRepository } from '../../repository/interfaces/ILocalStorageRepository';
import { ISetupService } from '../../services/interfaces/ISetupService';
import { ICompanyService } from '../../services/interfaces/ICompanyService';
import { IUserService } from '../../services/interfaces/IUserService';
import { EventsService } from '../../services/EventsService';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-company',
  templateUrl: './company.page.html',
  styleUrls: ['./company.page.scss'],
})

@Injectable()
export class CompanyPage implements OnInit {
  @ViewChildren('items') items: QueryList<any>;


  promptAlert: any;
  companyId: string;
  mode: any;

  public companyData: any = {
    "NomeFantasia": "",
    "RazaoSocial": "",
    "CNPJ": "",

    "Contato": "",
    "Telefone": "",

    "Latitude": "",
    "Longitude": "",

    "Logradouro": "",
    "Numero": "",
    "Complemento": "",
    "CEP": "",
    "Bairro": "",
    "Cidade": "",
    "UF": "",
    "Pais": "",

    "CartaoBandeira": "",
    "CartaoNumero": "",
    "CartaoVencimento": "",
    "CartaoCodigo": "",
    "CartaoNome": "",

    "UsuarioGerenteNome": "",
    "UsuarioGerenteEmail": "",
    "UsuarioGerenteTelefone": "",
    "UsuarioGerenteSenha": "",

  };


  constructor(
    public events: EventsService,
    private route: ActivatedRoute, private router: Router,
    private loaderCtrl: LoaderComponent,
    public toast: ToastComponent,
    public alertController: AlertController,
    private alertCtrl: AlertComponent,
    private platform: Platform,
    private keyboard: Keyboard,
    public navParams: NavParams,
    @Inject('LocalStorageRepositoryToken') private localStorageRepository: ILocalStorageRepository,
    @Inject('CompanyServiceToken') private companyService: ICompanyService,
    @Inject('UserServiceToken') private userService: IUserService,
    @Inject('SetupServiceToken') private setupService: ISetupService) {

    this.route.queryParams.subscribe((params) => {
      if (params) {
        this.mode = params.mode;
      }
    });


  }

  async ngOnInit() {

    await this.userService.gerarToken();
  }


  ionViewDidEnter() {
    //this.inputNomeFantasia.setFocus();
  }



  onKeyPressed(event, index) {

    console.log(index, this.items.toArray().length);

    if (event.keyCode == 13) {
      this.items.toArray()[index + 1].setFocus();
    }

    return true;
  }


  async companyVerify() {

    this.toast.showToastTop(`Verificando o <b>CNPJ</b> informado... `,3000);

    await this.companyService.getByCNPJ(this.companyData.CNPJ.trim())
      .then((response) => {

        if (response) {
          if (response.cnpj.trim() == this.companyData.CNPJ.trim() ) {
            this.toast.showToastBottom('O <b>CNPJ</b> informado já foi usado! ',3000);
            this.companyData.CNPJ = "";
            this.items.toArray()[2].setFocus();
            return false;
          }
          else {
            this.toast.showToastTop('O <b>CNPJ</b> está OK ',3000);
            return true;
          }
  
        }
        else {
          this.toast.showToastTop('O <b>CNPJ</b> está OK ',3000);
          return true;
        }

     });

  }


  async userVerify() {

    this.toast.showToastTop(`Verificando o <b>E-Mail</b> informado... `,3000);

    await this.userService.obterPorEmail(this.companyData.UsuarioGerenteEmail.trim())
      .then((response) => {

        if (response) {
          if (response.mail.trim() == this.companyData.UsuarioGerenteEmail.trim() ) {

            this.toast.showToastBottom('O <b>E-Mail</b> informado já foi usado! ',3000);
            this.companyData.UsuarioGerenteEmail = "";
            this.items.toArray()[20].setFocus();
            return false;
          }
          else {
            this.toast.showToastTop('O <b>E-Mail</b> informado está OK ',3000);
            return true;
          }
  
        }
        else {
          this.toast.showToastTop('O <b>E-Mail</b> informado está OK ',3000);
          return true;
        }

     });
}


  async salvar() {

  if (this.companyData.NomeFantasia.trim() === "") {
    this.alertCtrl.showAlert('RepassAuto - Agência', `Informe o Nome Fantasia`);
    this.items[0].setFocus();
    return false;
  }
  if (this.companyData.RazaoSocial.trim() === "") {
    this.alertCtrl.showAlert('RepassAuto - Agência', `Informe o Razao Social`);
    this.items[1].setFocus();
    return false;
  }
  if (this.companyData.CNPJ.trim() === "") {
    this.alertCtrl.showAlert('RepassAuto - Agência', `Informe o CNPJ`);
    this.items[2].setFocus();
    return false;
  }


  if (this.companyData.UsuarioGerenteNome.trim() === "") {
    this.alertCtrl.showAlert('RepassAuto - Agência', `Informe o nome do Usuário Gerente`);
    this.items[20].setFocus();
    return false;
  }
  if (this.companyData.UsuarioGerenteEmail.trim() === "") {
    this.alertCtrl.showAlert('RepassAuto - Agência', `Informe Usuário Gerente Email`);
    this.items[21].setFocus();
    return false;
  }
  if (this.companyData.UsuarioGerenteTelefone.trim() === "") {
    this.alertCtrl.showAlert('RepassAuto - Agência', `Informe Usuário Gerente Telefone`);
    this.items[22].setFocus();
    return false;
  }
  if (this.companyData.UsuarioGerenteSenha.trim() === "") {
    this.alertCtrl.showAlert('RepassAuto - Agência', `Informe Usuário Gerente Senha`);
    this.items[23].setFocus();
    return false;
  }



}


  async concluir() {


  this.promptAlert = await this.alertController.create({
    subHeader: 'Concluir',
    message: 'Tem certeza <br>que deseja Salvar? ',
    cssClass: 'alert-warning',
    buttons: [
      {
        text: 'Não',
        role: 'cancel',
        handler: () => {
          console.log('Nao-------->');
          this.items.toArray()[0].setFocus();
        }
      },
      {
        text: 'Sim',
        handler: (data) => {
          console.log('Sim-------->');
        }
      }]

  });
  await this.promptAlert.present();

}




}
