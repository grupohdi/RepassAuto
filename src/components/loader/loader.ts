import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'loader',
  templateUrl: 'loader.html'
})
export class LoaderComponent {

  public isLoading = false;

  constructor(
    public loaderCtrl: LoadingController) { }


    async showLoader(message?: string) {
      this.isLoading = true;
      this.loaderCtrl.create({
        message: message ? message : 'Por favor, espere...'
      }).then(loader => {
        loader.present().then(() => {
          if (!this.isLoading) {
            loader.dismiss();
          }
        });
      });
    }
  
    async hiddenLoader() {
      this.isLoading = false;
      this.loaderCtrl.getTop().then(loader => {
        if (loader) {
          loader.dismiss();
        }
      });
    }

}
