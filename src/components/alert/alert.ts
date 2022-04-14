import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'alert',
  templateUrl: 'alert.html'
})
export class AlertComponent {

  private alert;
  private confirm;
  constructor(
    private alertCtrl: AlertController) { }

  async showAlert(title: string, message: string) {
    this.alert = await this.alertCtrl
      .create({
        subHeader: title,
        message: message,
        cssClass:'alert-warning',
        buttons: ['OK']
      });

    await this.alert.present();
  }

  async showAlertConfirm(title: string, message: string) {
    let confirma: boolean;
    this.confirm = await this.alertCtrl
      .create({
        subHeader: title,
        message: message,
        cssClass:'alert-warning',
        buttons: [
          {
            text: "Sim",
            handler: () => {
              return true;
            }
          },
          {
            text: "Não",
            handler: () => {
              this.confirm.dismiss();
              return false;
            }
          }
        ]
      });

    await this.confirm.present();
  }
}
