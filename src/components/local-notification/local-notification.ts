import { Component } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'local-notification',
  templateUrl: 'local-notification.html'
})
export class LocalNotificationComponent {

  constructor(private localNotifications: LocalNotifications) { }

  showNotification(title: string, text: string) {
    this.localNotifications
      .schedule({
        title: title,
        text: text,
        icon: ''
      });
  }

  showLocalNotficationTimer() {
    this.localNotifications
      .schedule({
        text: 'Delayed ILocalNotification',
        //at: new Date(new Date().getTime() + 3600),
        led: 'FF0000',
        sound: null
      });
  }
}
