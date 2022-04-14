import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { AlertComponent } from './alert/alert';
import { LoaderComponent } from './loader/loader';
import { LocalNotificationComponent } from './local-notification/local-notification';
import { ToastComponent } from './toast/toast';


import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        LoaderComponent,
        AlertComponent,
        ToastComponent,
        LocalNotificationComponent],
    imports: [CommonModule,IonicModule],
    exports: [
        LoaderComponent,
        AlertComponent,
        ToastComponent,
        LocalNotificationComponent],
    entryComponents: [],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule { }
