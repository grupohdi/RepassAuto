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

  logged: any;
  rlUser: any;
  company: any;

  promptAlert: any;
  companyId: string;
  mode: number;

  paisActionSheetOptions: any = {
    header: 'Países',
    subHeader: 'Selecione o País',
  };

  estadoActionSheetOptions: any = {
    header: 'Estados',
    subHeader: 'Selecione o Estado',
  };

  cidadeActionSheetOptions: any = {
    header: 'Cidades',
    subHeader: 'Selecione a Cidade',
  };


  public Paises: any[] = [
    { "nome": "Brasil" },
    { "nome": "Colômbia" },
    { "nome": "Chile" },
    { "nome": "Argentina"},
  ];

  public Estados: any[] = [
    { "pais": "Brasil", "estado": "São Paulo", "uf": "SP" },
    { "pais": "Brasil", "estado": "Rio de Janeiro", "uf": "RJ" },
    { "pais": "Brasil", "estado": "Paraná", "uf": "PR" },
    { "pais": "Brasil", "estado": "Santa Catarina", "uf": "SC" },
    { "pais": "Brasil", "estado": "Rio Grande do Sul", "uf": "RS" },
    { "pais": "Brasil", "estado": "Minas Gerais", "uf": "MG" },
    { "pais": "Brasil", "estado": "Acre", "uf": "AC" },
    { "pais": "Brasil", "estado": "Alagoas", "uf": "AL" },
    { "pais": "Brasil", "estado": "Amapá", "uf": "AP" },
    { "pais": "Brasil", "estado": "Amazonas", "uf": "AM" },
    { "pais": "Brasil", "estado": "Bahia", "uf": "BA" },
    { "pais": "Brasil", "estado": "Ceará", "uf": "CE" },
    { "pais": "Brasil", "estado": "Distrito Federal", "uf": "DF" },
    { "pais": "Brasil", "estado": "Espírito Santo", "uf": "ES" },
    { "pais": "Brasil", "estado": "Goiás", "uf": "GO" },
    { "pais": "Brasil", "estado": "Maranhão", "uf": "MA" },
    { "pais": "Brasil", "estado": "Mato Grosso", "uf": "MT" },
    { "pais": "Brasil", "estado": "Mato Grosso do Sul	", "uf": "MS" },
    { "pais": "Brasil", "estado": "Pará", "uf": "PA" },
    { "pais": "Brasil", "estado": "Paraíba", "uf": "PB" },
    { "pais": "Brasil", "estado": "Pernambuco", "uf": "PE" },
    { "pais": "Brasil", "estado": "Piauí", "uf": "PI" },
    { "pais": "Brasil", "estado": "Rio Grande do Norte 	", "uf": "RN" },
    { "pais": "Brasil", "estado": "Rondônia", "uf": "RO" },
    { "pais": "Brasil", "estado": "Roraima", "uf": "RR" },
    { "pais": "Brasil", "estado": "Sergipe", "uf": "SE" },
    { "pais": "Brasil", "estado": "Tocantins", "uf": "TO" },

    { "pais": "Colômbia", "estado": "Bogotá", "uf": "Bogotá" },
    { "pais": "Chile", "estado": "Santiago", "uf": "Santiago" },
    { "pais": "Argentina", "estado": "Buenos Aires", "uf": "Buenos Aires" },

  ];


  public Cidades: any[] = [
    { "nome": "São Paulo", "uf": "SP" },
    { "nome": "São Bernardo do Campo", "uf": "SP" },
    { "nome": "Santo André", "uf": "SP" },
    { "nome": "São Caetano do Sul", "uf": "SP" },
    { "nome": "Guarulhos", "uf": "SP" },
    { "nome": "Mogi das Cruzes", "uf": "SP" },
    { "nome": "Suzano", "uf": "SP" },

    { "nome": "Rio de Janeiro", "uf": "RJ" },
    { "nome": "Petropolis", "uf": "RJ" },
    { "nome": "Cabo Frio", "uf": "RJ" },
    { "nome": "Campo dos Goytacazes", "uf": "RJ" },
    { "nome": "Volta Redonda", "uf": "RJ" },
    { "nome": "Teresópolis", "uf": "RJ" },
    { "nome": "Duque de Caxias", "uf": "RJ" },
    { "nome": "Magé", "uf": "RJ" },
    { "nome": "Paraty", "uf": "RJ" },
    { "nome": "Angra dos Reis", "uf": "RJ" },


    { "nome": "Belo Horizonte", "uf": "MG" },
    { "nome": "Uberaba", "uf": "MG" },
    { "nome": "Uberlândia", "uf": "MG" },
    { "nome": "Contagem", "uf": "MG" },
    { "nome": "Gov. Valadares", "uf": "MG" },
    { "nome": "Uberlândia", "uf": "MG" },
    { "nome": "Juiz de Fora", "uf": "MG" },

    { "nome": "Curitiba", "uf": "PR" },
    { "nome": "Ponta Grossa", "uf": "PR" },

    { "nome": "Camburiú", "uf": "SC" },
    { "nome": "Blumenau", "uf": "SC" },
    { "nome": "Florianópolis", "uf": "SC" },

    { "nome": "Porto Alegre", "uf": "RS" },
    { "nome": "Pelotas", "uf": "RS" },

  ];



  public companyData: any = {
    "nomeFantasia": "",
    "razaoSocial": "",
    "cnpj": "",

    "contato": "",
    "telefone": "",

    "latitude": "",
    "longitude": "",

    "logradouro": "",
    "numero": "",
    "complemento": "",
    "CEP": "",
    "bairro": "",
    "cidade": "",
    "uf": "",
    "pais": "",

    "cartoes": [{
      "bandeira": "",
      "numero": "",
      "vencto": "",
      "codigo": "",
      "nome": "",
    }],

    "UsuarioGerenteNome" : "",
    "UsuarioGerenteEmail" : "",
    "UsuarioGerenteTelefone" : "",
    "UsuarioGerenteSenha" : "",

  };

  public userData: any = {
    "name": "",
    "mail": "",
    "phone": "",
    "password": "",
  };

  btnCriar: string = "* Criar";
  lblCriar: string = "* Cria a Agência e Usuário para acessar as excelentes ofertas de repasse de veículos no RepassAuto.";


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
        console.log('mode----->', this.mode);
      }
    });


  }

  async ngOnInit() {
  }


  async ionViewDidEnter() {
    if (this.mode == 0) {
      await this.userService.gerarToken();
      this.btnCriar = "* Criar";
      this.lblCriar = "* Cria a Agência e Usuário para acessar as excelentes ofertas de repasse de veículos no RepassAuto.";
    } else if (this.mode == 1) {

      this.loaderCtrl.showLoader(`Carregando...`);
      await this.getCompanyData();
      this.btnCriar = "Atualizar";
      this.lblCriar = "Atualiza os dados da Agência e Cartão.";

    }
  }

  async getCompanyData() {

    this.platform.ready().then(() => {

      if (this.mode == 1) {

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


        this.companyService.getById(this.rlUser.companyId)
          .then((response: any) => {

            if (response) {

              this.companyData = response;

              if ((this.companyData.cartoes == undefined) || 
                  (this.companyData.cartoes.length==0) ) {

                    this.companyData.cartoes = [{
                    "bandeira": "",
                    "numero": "",
                    "vencto": "",
                    "codigo": "",
                    "nome": "",
                  }];

              }

              this.userService.obterPorId(this.rlUser.userId)
                .then((userResponse: any) => {


                  this.loaderCtrl.hiddenLoader();
                  if (userResponse) {
                    this.userData = userResponse;
                    console.log('this.userData', this.userData);
                  }
                })
                .catch((error) => {
                  this.loaderCtrl.hiddenLoader();
                  this.alertCtrl.showAlert('RepassAuto - Agência', `Erro .`);
                });
          
            };
          })
          .catch((error) => {
            this.loaderCtrl.hiddenLoader();
            this.alertCtrl.showAlert('RepassAuto - Agência', `Erro .`);
          });

      }
    });

  }



  onKeyPressed(event, index) {

    if (event.keyCode == 13) {
      this.items.toArray()[index + 1].setFocus();
    }

    return true;
  }


  async companyVerify() {

    if (this.mode == 0) {

      if (this.cnpjVerify()) {

        this.toast.showToastTop(`Verificando o <b>CNPJ</b> informado... `, 3000);

        await this.companyService.getByCNPJ(this.companyData.cnpj.trim())
          .then((response) => {

            if (response) {
              if (response.cnpj.trim() == this.companyData.cnpj.trim()) {
                this.toast.showToastBottom('O <b>CNPJ</b> informado já foi usado! ', 3000);
                this.companyData.cnpj = "";
                this.items.toArray()[2].setFocus();
                return false;
              }
              else {
                this.toast.showToastTop('O <b>CNPJ</b> pode ser usado. OK ', 3000);
                return true;
              }

            }
            else {
              this.toast.showToastTop('O <b>CNPJ</b> pode ser usado. OK ', 3000);
              return true;
            }

          });
      }
    }

  }



  async userVerify() {

    if (this.mode == 0) {

      if (!this.isEmail(this.userData.mail.trim())) {

        this.alertCtrl.showAlert('E-MAIL Inválido!', 'Digite um e-mail válido para prosseguir');
        this.companyData.mail = "";
        this.items.toArray()[20].setFocus();
        return false;
      }


      this.toast.showToastTop(`Verificando o <b>E-Mail</b> informado... `, 3000);

      await this.userService.obterPorEmail(this.userData.mail.trim())
        .then((response) => {

          if (response) {
            if (response.mail.trim() == this.companyData.mail.trim()) {

              this.toast.showToastBottom('O <b>E-Mail</b> informado já foi usado! ', 3000);
              this.companyData.mail = "";
              this.items.toArray()[20].setFocus();
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

  async preencheUfs() {

    this.companyData.uf = "";
    this.companyData.cidade = "";
  }

  async preencheCidades() {

    this.companyData.cidade = "";

  }


  async salvar() {

    if (this.companyData.nomeFantasia.trim() === "") {
      this.toast.showToastBottom(`Informe o Nome Fantasia`, 2000);
      this.items.toArray()[0].setFocus();
      return false;
    }
    if (this.companyData.razaoSocial.trim() === "") {
      this.toast.showToastBottom(`Informe a Razão Social`, 2000);
      this.items.toArray()[1].setFocus();
      return false;
    }
    if (this.companyData.cnpj.trim() === "") {
      this.toast.showToastBottom(`Informe o CNPJ`, 2000);
      this.items.toArray()[2].setFocus();
      return false;
    }


    if (this.userData.name.trim() === "") {
      this.toast.showToastBottom(`Informe o Nome do Gerente`, 2000);
      this.items[19].setFocus();
      return false;
    }
    if (this.userData.mail.trim() === "") {
      this.toast.showToastBottom(`Informe o E-Mail do Gerente`, 2000);
      this.items[20].setFocus();
      return false;
    }
    if (this.userData.phone.trim() === "") {
      this.toast.showToastBottom(`Informe o Telefone do Gerente`, 2000);
      this.items[21].setFocus();
      return false;
    }
    if (this.userData.password.trim() === "") {
      this.toast.showToastBottom(`Informe a Senha do Gerente`, 2000);
      this.items[22].setFocus();
      return false;
    }

    if (this.mode == 0) {

      this.promptAlert = await this.alertController.create({
        subHeader: 'Criação de Agência',
        message: 'Confirma os dados informados para criar a Agência? ',
        cssClass: 'custom-alert-class',
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
            handler: () => {
              console.log('Sim-------->');
              this.createCompany();
            }
          }]

      });
      await this.promptAlert.present();
    }
    else {

      this.promptAlert = await this.alertController.create({
        subHeader: 'Atualização de Agência',
        message: 'Confirma os dados informados para atualizar a Agência? ',
        cssClass: 'custom-alert-class',
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
            handler: () => {
              console.log('Sim-------->');
              this.updateCompany();
            }
          }]

      });
      await this.promptAlert.present();
    }

  }

  async createCompany() {

    this.loaderCtrl.showLoader(`Criando Agência...`);

    this.companyData.UsuarioGerenteNome = this.userData.name;
    this.companyData.UsuarioGerenteEmail = this.userData.mail;
    this.companyData.UsuarioGerenteTelefone = this.userData.phone;
    this.companyData.UsuarioGerenteSenha = this.userData.password;

    await this.userService.gerarToken();

    await this.setupService.createCompanyData(this.companyData)
      .then((response) => {
        this.loaderCtrl.hiddenLoader();

        this.alertCtrl.showAlert('RepassAuto - Agência', `Agência criada com sucesso!!\n`);
        this.router.navigate(['/login']);

      })
      .catch((error) => {
        this.loaderCtrl.hiddenLoader();
        this.alertCtrl.showAlert('RepassAuto - Agência', `Erro ao criar a Agência.`);
      });
  }

  async updateCompany() {

    this.loaderCtrl.showLoader(`Atualizando dados da Agência...`);
    await this.companyService.update(this.companyData)
      .then((response) => {
        this.loaderCtrl.hiddenLoader();
        this.alertCtrl.showAlert('RepassAuto - Agência', `Dados da Agência atualizados com sucesso!`);

      })
      .catch((error) => {
        this.loaderCtrl.hiddenLoader();
        this.alertCtrl.showAlert('RepassAuto - Agência', `Erro ao atualizar a Agência.`);
      });
  }






  cnpjVerify() {
    // Verifica se a variável cnpj é igua a "undefined", exibindo uma msg de erro
    if (this.companyData.cnpj.trim() == "" || this.companyData.cnpj.length < 18) {
      this.alertCtrl.showAlert('CNPJ Inválido!', 'Digite um número de CNPJ válido para prosseguir');
      this.companyData.cnpj = "";
      this.items.toArray()[2].setFocus();
      return false;
    }

    // Esta função retira os caracteres . / - da string do cnpj, deixando apenas os números 
    var strCNPJ = this.companyData.cnpj.replace('.', '').replace('.', '').replace('/', '').replace('-', '');

    if (strCNPJ.length == 14) {

      // Testa as sequencias que possuem todos os dígitos iguais e se o cnpj não tem 14 dígitos, retonando falso e exibindo uma msg de erro
      if (strCNPJ === '00000000000000' || strCNPJ === '11111111111111' || strCNPJ === '22222222222222' || strCNPJ === '33333333333333' ||
        strCNPJ === '44444444444444' || strCNPJ === '55555555555555' || strCNPJ === '66666666666666' || strCNPJ === '77777777777777' ||
        strCNPJ === '88888888888888' || strCNPJ === '99999999999999' || strCNPJ.length !== 14) {
        this.alertCtrl.showAlert('CNPJ Inválido!', 'Digite um número de CNPJ válido para prosseguir');
        this.companyData.cnpj = "";
        this.items.toArray()[2].setFocus();
        return false;
      }

      // A variável numeros pega o bloco com os números sem o DV, a variavel digitos pega apenas os dois ultimos numeros (Digito Verificador).
      var tamanho = strCNPJ.length - 2;
      var numeros = strCNPJ.substring(0, tamanho);
      var digitos = strCNPJ.substring(tamanho);
      var soma = 0;
      var pos = tamanho - 7;

      // Os quatro blocos seguintes de funções irá reaizar a validação do CNPJ propriamente dito, conferindo se o DV bate. Caso alguma das funções não consiga verificar
      // o DV corretamente, mostrará uma mensagem de erro ao usuário e retornará falso, para que o usário posso digitar novamente um número 
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
          pos = 9;
        }
      }

      var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(0)) {
        this.alertCtrl.showAlert('CNPJ Inválido!', 'Digite um número de CNPJ válido para prosseguir');
        this.companyData.cnpj = "";
        this.items.toArray()[2].setFocus();
        return false;
      }

      tamanho = tamanho + 1;
      numeros = strCNPJ.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (let k = tamanho; k >= 1; k--) {
        soma += numeros.charAt(tamanho - k) * pos--;
        if (pos < 2) {
          pos = 9;
        }
      }

      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(1)) {
        this.alertCtrl.showAlert('CNPJ Inválido!', 'Digite um número de CNPJ válido para prosseguir');
        this.companyData.cnpj = "";
        this.items.toArray()[2].setFocus();
        return false;
      }

      return true;
    }
  }

  isEmail(search: string): boolean {
    let serchfind: boolean = false;

    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    serchfind = regexp.test(search);

    return serchfind;
  }
}
