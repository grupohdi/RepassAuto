import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'toast',
  templateUrl: 'toast.html'
})
export class ToastComponent {

  constructor(private toastCtrl: ToastController) { }

  async showToastTop(message: string, duration: number) {
    let toast = await this.toastCtrl
      .create({
        message: message,
        duration: duration,
        position: 'top',
        cssClass: 'toast-good-custom-class',
      });
    await toast.present();
  }

  async showToastBottom(message: string, duration: number) {
    let toast = await this.toastCtrl
      .create({
        message: message,
        duration: duration,
        position: 'bottom',
        cssClass: 'toast-bad-custom-class',
      });
    await toast.present();
  }
}
