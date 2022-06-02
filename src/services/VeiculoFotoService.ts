import { Inject, Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { IConfiguracaoService } from './interfaces/IConfiguracaoService';
import { IVeiculoFotoService } from './interfaces/IVeiculoFotoService';
import { VeiculoFotoDto } from '../dto/VeiculoFotoDto';
import { IHttpClientProxy } from './interfaces/IHttpClientProxy';

const WEBAPI_PATH_VEHICLE_PHOTO = "/plt_veiculo_foto_v1/vehicles_photos";
@Injectable()
export class VeiculoFotoService implements IVeiculoFotoService {

    options: CameraOptions;

    constructor(
        private camera: Camera,
        @Inject('HttpClientProxyToken') private httpClientProxy: IHttpClientProxy,
        @Inject('ConfiguracaoServiceToken') private configuracaoService: IConfiguracaoService
    ) {

        this.options = {
            cameraDirection: 0,
            quality: 80,
            saveToPhotoAlbum: false,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            allowEdit: false,
            targetWidth: 380,
            targetHeight: 280
        };
    }


    //--------------------------------------------------------
    tiraFoto(veiculoId: string, source: number): Promise<any> {

        return new Promise((resolve, reject) => {


            this.options.sourceType =  this.camera.PictureSourceType.CAMERA;
            if (source == 1) {
                this.options.sourceType =  this.camera.PictureSourceType.PHOTOLIBRARY;
            } 


            this.camera.getPicture(this.options)
                .then((imageData) => {

                    let base64Image = 'data:image/jpeg;base64,' + imageData;

                    let foto = new VeiculoFotoDto();
                    foto.veiculoId = veiculoId;
                    foto.status = "active";
                    foto.ordem = "1";
                    foto.base64 = base64Image;
                    
                    resolve(foto);

                }, (e) => {

                    console.error('Erro ao acionar camera do dispositivo', e);
                    reject(null);
                });
        });
    }


    tryEnviarFoto(veiculoFotoDto: VeiculoFotoDto): Promise<boolean> {

        return new Promise((resolve, reject) => {

        this.httpClientProxy.post(this.configuracaoService.webApiUrl(), WEBAPI_PATH_VEHICLE_PHOTO, veiculoFotoDto)
            .subscribe((response) => {
                console.log("VeiculoFotoService - envio - OK ");
                resolve(true);
            }, (error) => {
                console.log("VeiculoFotoService - envio - ERRO ", error);
                resolve(false);
            });

        });
    }


    tryExcluirFoto(veiculoFotoId: string): Promise<boolean> {

        return new Promise((resolve, reject) => {

        this.httpClientProxy.delete(this.configuracaoService.webApiUrl(), `${WEBAPI_PATH_VEHICLE_PHOTO}/${veiculoFotoId}`)
            .subscribe((response) => {
                console.log("VeiculoFotoService - delete - OK ");
                resolve(true);
            }, (error) => {
                console.error("VeiculoFotoService - delete - Erro ", error);
                resolve(false);
            });

        });
    }





}




