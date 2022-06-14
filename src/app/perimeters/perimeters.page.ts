import * as $ from 'jquery';

import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AlertComponent } from '../../components/alert/alert';
import { LoaderComponent } from '../../components/loader/loader';

import { ILocalStorageRepository } from '../../repository/interfaces/ILocalStorageRepository';
import { IPerimetroService } from '../../services/interfaces/IPerimetroService';
import { PerimetroDto } from '../../dto/perimetroDto';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ToastComponent } from 'src/components/toast/toast';
import { FunctionsProvider } from '..//src/src/provider/';


declare var google: any;



@Component({
  selector: 'app-perimeters',
  templateUrl: './perimeters.page.html',
  styleUrls: ['./perimeters.page.scss'],
})

export class PerimetersPage implements OnInit {
  public map: any;

  public logged: any;
  public rlUser: any;
  public company: any;
  public perimeters: any;
  public carregando: string = "Procurando por Perímetros cadastrados...";

  public latitude: any = 0; //latitude
  public longitude: any = 0; //longitude
  public options = {
    timeout: 10000,
    enableHighAccuracy: true,
    maximumAge: 3600
  };


  constructor(
    public router: Router,
    public loaderCtrl: LoaderComponent,
    public platform: Platform,
    public alertCtrl: AlertComponent,
    public alertController: AlertController,
    public nav: NavController,
    public geolocation: Geolocation,
    public toast: ToastComponent,
    @Inject('LocalStorageRepositoryToken') private localStorageRepository: ILocalStorageRepository,
    @Inject('PerimetroServiceToken') public perimetroService: IPerimetroService) {

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

    this.platform.ready().then(async () => {

      this.carregarRefresh(null);

    });

  }


  async doRefresh(refresher) {
    this.carregarRefresh(refresher);
  }


  // use geolocation to get user's device coordinates
  async getCurrentCoordinates() {
    this.geolocation.getCurrentPosition().then(async (resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      //this.showMap();
      await this.loadMap(this.latitude, this.longitude);
      await this.showMap();


    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  async loadMap(lat, lng) {
    let latLng = new google.maps.LatLng(lat, lng);
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: latLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: true,
      zoomControl: true,
      streetViewControl: true,
    });
    new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });
  }


  async carregarRefresh(refresher) {



    await this.perimetroService.getAll(this.rlUser.companyId, this.rlUser.userId)
      .then(async (result: any) => {


        this.loaderCtrl.hiddenLoader();
        if (result) {
          this.perimeters = result;

          this.getCurrentCoordinates();

        } else {
          this.carregando = "nenhum perímetro cadastrado";
        }

        if (refresher)
        refresher.target.complete();

      })
      .catch((e: any) => {
        if (refresher)
        refresher.target.complete();

        this.loaderCtrl.hiddenLoader();
        this.alertCtrl.showAlert('RepassAuto - Usuários', `Erro ao carregar os perímetros.`);
      });


  }


  async abrir(perimeter: PerimetroDto) {

    if (perimeter == null) {
      perimeter = new PerimetroDto();
      perimeter.companyId = this.rlUser.companyId;
      perimeter.userId = this.rlUser.userId;
      perimeter.createdAt = new Date();

    }
    let navigationExtras: NavigationExtras = { "state": { "perimeter": perimeter } };
    this.router.navigate(['/perimeters/perimeter'], navigationExtras);

  }


  async apagar(vehicle: any) {

    let attemption = '<b>Atenção!</b><br>';
    attemption += 'Tem certeza?';

    const alert = await this.alertController.create({
      subHeader: 'RepassAuto - Cadastro de Perímetros',
      message: attemption,
      cssClass: 'custom-alert-class',
      buttons: [
        {
          text: 'Sim',
          role: 'cancel',
          handler: () => {
            console.log('sim');
          }
        },
        {
          text: 'Não',
          handler: () => {
            console.log('Não');
          }
        }
      ]
    });
    await alert.present();


  }


  async showMap() {

    let markers = [];
    let circles = [];

    var perimeter = new PerimetroDto();
    perimeter.companyId = this.rlUser.companyId;
    perimeter.userId = this.rlUser.userId;

    const salvar = this.salvar;
    const excluir = this.excluir;
    const perimeterService = this.perimetroService;
    const map = this.map;

    // 1) Carrega os perimetros existentes
    this.perimeters.map(item => {

      let infowindow = new google.maps.InfoWindow({
        position: new google.maps.LatLng(item.latitude * 1, item.longitude * 1),
        maxWidth: 400,
      });

      let marker = new google.maps.Marker({
        position: { lat: item.latitude * 1, lng: item.longitude * 1 },
        draggable: true,
        icon: {
          url: "../../assets/imgs/range.png",
          size: new google.maps.Size(40, 40),
          scaledSize: new google.maps.Size(40, 40),
          labelOrigin: new google.maps.Point(15, 50)
        },
        label: {
          text: item.description,
          color: 'green',
          fontSize: '16px',
          fontWeight: '900',
          x: '200',
          y: '100'
        },
        infowindow: infowindow
      });
      marker.setMap(map);

      let html: string = `<div id="mapInfoWindow">
        Perímetro:  <b> <span name="keyId" id="keyId"><b style="color:#ff0000">${item.id}</b></span> 
        <input type="hidden" name="key" id="key" value="${item.id}"><br />
        Descrição: <input class="inputTextClass" type="text" name="description" id="description" value="${item.description}" maxlenght="20" > <br />
        Range(KM): <input class="inputTextClass" type="number" name="range" id="range" value="${item.range}" maxlenght="4" > <br />
        Latitude: <input class="inputClass" type="number" name="latitude" id="latitude" value="${item.latitude}" maxlenght="4" > <br />
        Longitude: <input class="inputClass" type="number" name="longitude" id="longitude" value="${item.longitude}" maxlenght="4" > <br />
        <input type="button" class="btnBadtClass" name="#btnExcluir" id="btnExcluir" value="Excluir" />
        <input type="button" class="btnGoodClass" name="#btnSalvar" id="btnSalvar" value="Salvar"><br>
        <div class="divClass" name="#btnFechar" id="btnFechar">[X] Fechar</div>
        </div>`;

      infowindow.setContent(html);
      markers.push(marker);

      const cityCircle = new google.maps.Circle({
        strokeColor: '#0c9cf0',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#0c9cf0',
        fillOpacity: 0.25,
        center: { lat: item.latitude * 1, lng: item.longitude * 1 },
        radius: item.range * 1000,
      });
      cityCircle.setMap(this.map);
      circles.push(cityCircle);


      marker.addListener('click', function () {

        markers.map(marker => {
          marker.infowindow.close(marker);
        });

        infowindow.open(map, this);

      });




      // adds a listener to the marker
      // gets the coords when drag event ends
      // then updates the input with the new coords
      google.maps.event.addListener(marker, 'dragend', function (evt) {

        marker.infowindow.open(map, this);

        var range: any = $("#range").val();
        var oldLat = $("#latitude").val();
        var oldLng = $("#longitude").val();

        $("#latitude").val(evt.latLng.lat());
        $("#longitude").val(evt.latLng.lng());
        map.panTo(evt.latLng);

        const cityCircle = new google.maps.Circle({
          strokeColor: '#0c9cf0',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#0c9cf0',
          fillOpacity: 0.25,
          center: evt.latLng,
          radius: range * 1000,
        });
        cityCircle.setMap(map);
        circles.push(cityCircle);

        circles.map(circle => {
          let center = circle.center.toJSON();
          if (center.lat == oldLat && center.lng == oldLng) {
            circle.setMap(null);
          }
        });

      });

      google.maps.event.addListener(infowindow, 'domready', function () {


        $('#btnSalvar').on('click', async function () {

          perimeter.id = $('#key').val();
          perimeter.description = $('#description').val();
          perimeter.range = $('#range').val();
          perimeter.latitude = $('#latitude').val();
          perimeter.longitude = $('#longitude').val();

          $('#keyId').html(`<b style="color:#ff0000">salvando...</b>`);
          const response = await salvar(perimeter, perimeterService);
          if (response) {
            $('#keyId').html(`<b>${response.id}</b>`);
            $('#key').val(response.id);

            const cityCircle = new google.maps.Circle({
              strokeColor: '#0c9cf0',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#0c9cf0',
              fillOpacity: 0.25,
              center: { lat: response.latitude * 1, lng: response.longitude * 1 },
              radius: response.range * 1000,
            });
            cityCircle.setMap(map);
            circles.push(cityCircle);

          }


        });

        $('#btnExcluir').on('click', async function () {

          perimeter.id = $('#key').val();

          if (perimeter.id != "") {
            $('#keyId').html(`<b style="color:#ff0000">Excluindo...</b>`);
            await excluir(perimeter.id, perimeterService).then(async (response) => {

              await circles.map(circle => {
                let circleCenter = circle.center.toJSON();

                if (circleCenter.lat == perimeter.latitude && circleCenter.lng == perimeter.longitude) {
                  circle.setMap(null);
                }
              });

              await markers.map(marker => {
                let markerPosition = marker.position.toJSON();

                if (markerPosition.lat == perimeter.latitude && markerPosition.lng == perimeter.longitude) {
                  markers.splice(marker);
                  marker.infowindow.close(marker);
                  marker.setMap(null);
                }
              });

            }).catch((error) => {
              $('#keyId').html(`<b style="color:#ff0000">Erro ao excluir..</b>`);
            });
          }

        });


        $('#btnFechar').on('click', async function () {

          markers.map(marker => {
            marker.infowindow.close(marker);
          });
        });

      });





    });


    // 2) Adiciona o click de Inclusao no mapa
    map.addListener('click', function (e) {

      let location = e.latLng.toJSON();
      let position = { lat: location.lat, lng: location.lng };

      let infowindow = new google.maps.InfoWindow({
        position: position,
        maxWidth: 400
      });
      let html: string = `<div id="mapInfoWindow">
        Perímetro: <span name="keyIdr" id="keyId"></span>
        <input type="hidden" name="key_Incluir" id="key_Incluir" value=""><br />
        Descrição: <input class="inputTextClass" type="text" placeholder="Descrição" name="description_Incluir" id="description_Incluir" maxlength="20" ><br>
        Range(KM): <input class="inputTextClass" type="number" placeholder="Range (KM)" name="range_Incluir" id="range_Incluir" maxlength="4" ><br>
        Latitude: <input class="inputClass" type="number" placeholder="Latitude" name="latitude_Incluir" id="latitude_Incluir" value="${position.lat}"> <br>
        Longitude: <input class="inputClass" type="number" placeholder="Longitude" name="longitude_Incluir" id="longitude_Incluir" value="${position.lng}"> <br>
        <input type="button" class="btnBadtClass" name="#btn_Incluir_Excluir" id="btn_Incluir_Excluir" value="Excluir" />
        <input type="button" class="btnGoodClass" name="#btn_Incluir" id="btn_Incluir" value="Salvar"><br>
        <div class="divClass" name="#btn_Incluir_Fechar" id="btn_Incluir_Fechar">[X] Fechar</div>
      </div>`;
      infowindow.setContent(html);

      let marker = new google.maps.Marker({
        position: position,
        infowindow: infowindow,
        icon: {
          url: "../../assets/imgs/range.png",
          size: new google.maps.Size(40, 40),
          scaledSize: new google.maps.Size(40, 40),
          labelOrigin: new google.maps.Point(15, 50)
        },
        label: {
          text: '',
          color: 'green',
          fontSize: '16px',
          fontWeight: '900',
          x: '200',
          y: '100'
        },

      });
      marker.setMap(map);
      markers.push(marker);


      infowindow.open(map, marker);


      //---------------------------------------------------------------------------
      marker.addListener('click', function () {

        markers.map(marker => {
          marker.infowindow.close(marker);
        });

        this.infowindow.open(map, this);
      });


      //---------------------------------------------------------------------------
      google.maps.event.addListener(infowindow, 'domready', function () {


        $('#btn_Incluir').on('click', async function () {

          perimeter.id = $('#key_Incluir').val();
          perimeter.description = $('#description_Incluir').val();
          perimeter.range = $('#range_Incluir').val();
          perimeter.latitude = $('#latitude_Incluir').val();
          perimeter.longitude = $('#longitude_Incluir').val();

          $('#key_Incluir').html(`<b style="color:#ff0000">Incluindo...</b>`);
          await salvar(perimeter, perimeterService).then((response) => {
            if (response) {

              if ($('#key_Incluir').val() == "") {

                const cityCircle = new google.maps.Circle({
                  strokeColor: '#0c9cf0',
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: '#0c9cf0',
                  fillOpacity: 0.25,
                  center: { lat: response.latitude * 1, lng: response.longitude * 1 },
                  radius: response.range * 1000,
                });
                cityCircle.setMap(map);
                circles.push(cityCircle);
              }
              $('#keyId').html(`<b style="color:#ff0000">${response.id}</b>`);
              $('#key_Incluir').val(response.id);

            }

          }).catch((error) => {
            $('#keyId').html(`<b style="color:#ff0000">Erro ao incluir...</b>`);
          });

        });


        $('#btn_Incluir_Excluir').on('click', async function () {

          perimeter.id = $('#key_Incluir').val();
          perimeter.description = $('#description_Incluir').val();
          perimeter.range = $('#range_Incluir').val();
          perimeter.latitude = $('#latitude_Incluir').val();
          perimeter.longitude = $('#longitude_Incluir').val();

          if (perimeter.id != "") {
            await excluir(perimeter.id, perimeterService).then(async (response) => {

              await circles.map(circle => {
                let circleCenter = circle.center.toJSON();
                console.log('circleCenter', circleCenter);

                if (circleCenter.lat === perimeter.latitude &&
                  circleCenter.lng === perimeter.longitude) {
                  circle.setMap(null);
                }
              });

              await markers.map(marker => {
                let markerPosition = marker.position.toJSON();
                console.log('markerPosition', markerPosition);

                if (markerPosition.lat == perimeter.latitude &&
                  markerPosition.lng == perimeter.longitude) {
                  markers.splice(marker);
                  marker.infowindow.close(marker);
                  marker.setMap(null);
                }
              });


            }).catch((error) => {
              $('#key_Incluir').html(`<b style="color:#ff0000">Erro ao excluir..</b>`);
            });

          }

        });


        $('#btn_Incluir_Fechar').on('click', async function () {

          markers.map(marker => {
            marker.infowindow.close(marker);
          });
        });

      });






    });


  }


  public salvar(perimeter, perimeterService: any): any {

    return perimeterService.save(perimeter);

  }

  public excluir(perimeterId, perimeterService: any): any {

    return perimeterService.delete(perimeterId);

  }





}



// var perimeter:any = []; //new PerimetroDto();
// perimeter.id = id;
// perimeter.range = range;
// perimeter.latitude = range;
// perimeter.longitude = range;
// if (perimeter.range == "") {
//   this.toast.showToastBottom(`Informe o Range em kms`, 2000);
//   return false;
// }
// if (perimeter.latitude.trim() == "") {
//   this.toast.showToastBottom(`Informe a Latitude`, 2000);
//   return false;
// }
// if (perimeter.longitude.trim() == "") {
//   this.toast.showToastBottom(`Informe a Longitude`, 2000);
//   return false;
// }
// this.loaderCtrl.showLoader('Salvando perímetro...');
// this.perimetroService.save(perimeter)
//   .then((result: any) => {
//     this.loaderCtrl.hiddenLoader();
//   })
//   .catch((e: any) => {
//     this.loaderCtrl.hiddenLoader();
//     this.alertCtrl.showAlert('RepassAuto - Perímetros', `Erro ao salvar o perímetro.`);
//   });



  // displayRoute() {
  //   let configthis.mapa = this.localStorageRepository.recuperaConfiguracaoPorChave('configMap');
  //   let directionsService = new google.maps.DirectionsService;
  //   let directionsDisplay = new google.maps.DirectionsRenderer;
  //   let markerArray = [];

  //   let location = new google.maps.LatLng(this.listaGeoParadas[0].lat, this.listaGeoParadas[0].lng);
  //   let options = {
  //     center: location,
  //     zoom: 16,
  //     mapTypeId: 'roadmap',
  //     disableDefaultUI: false,
  //     styles: (configthis.mapa === 'dark') ? this.temaDark() : this.temaRetro()
  //   }

  //   let this.mapa = new google.maps.Map(this.this.mapaRef.nativeElement, options);
  //   directionsDisplay.setMap(this.mapa);

  //   let InfoWindowDisplay = new google.maps.InfoWindow;

  //   for (let i = 0; i < markerArray.length; i++) {
  //     markerArray[i].setMap(null);
  //   }

  //   let request = {
  //     origin: this.listaGeoParadas[0],
  //     destination: this.listaGeoParadas[this.listaGeoParadas.length - 1],
  //     travelMode: google.maps.TravelMode.DRIVING
  //   }

  //   directionsService.route(request, (response, status) => {
  //     if (status === google.maps.DirectionsStatus.OK) {
  //       directionsDisplay.setDirections(response);
  //       this.showMarkers(response, InfoWindowDisplay, this.mapa);
  //     } else {
  //       window.alert('Directions request failed due to ' + status);
  //     }
  //   });
  // }

