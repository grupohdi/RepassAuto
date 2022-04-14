import { Injectable } from '@angular/core';

import { IConfiguracaoService } from './interfaces/IConfiguracaoService';

@Injectable()
export class ConfiguracaoService implements IConfiguracaoService {
    webApiUrl(): string {
        return "https://southamerica-east1-autorepass.cloudfunctions.net";
    }
    oneSignalToken(): string {
        return "bb86ce78-2acc-4e72-83e9-8740956d0f21";
    }
    googleProjectId(): string {
        return "471715958021";
    }
}