import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'toast',
  templateUrl: 'toast.html'
})
export class ToastComponent {

  constructor(private toastCtrl: ToastController) { }

  async showToastTop(message: string) {
    let toast = await this.toastCtrl
      .create({
        message: message,
        duration: 5000,
        position: 'top'
      });
    await toast.present();
  }

  async showToastBottom(message: string) {
    let toast = await this.toastCtrl
      .create({
        message: message,
        duration: 5000,
        position: 'bottom'
      });
    await toast.present();
  }
}
