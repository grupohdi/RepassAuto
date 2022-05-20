import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';

@Injectable()
export class ValidacaoCamposProvider {

  constructor() { }

  isEmail(search: string): boolean {
    let serchfind: boolean = false;

    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    serchfind = regexp.test(search);

    return serchfind;
  }

  validaCPF(cpf) {
    let erro: String = "";

    if (cpf.length === 11) {
      var nonNumbers = /\D/;
      if (nonNumbers.test(cpf)) {
        erro = "A verificacao de CPF suporta apenas números!";
      }
      else {
        if (cpf == "00000000000" ||
          cpf == "11111111111" ||
          cpf == "22222222222" ||
          cpf == "33333333333" ||
          cpf == "44444444444" ||
          cpf == "55555555555" ||
          cpf == "66666666666" ||
          cpf == "77777777777" ||
          cpf == "88888888888" ||
          cpf == "99999999999") {
          erro = "Número de CPF inválido!"
        }

        let a = [];
        let b: number = 0;
        let c = 11;
        let x: number = 0;
        let y: number = 0;

        for (let i = 0; i < 11; i++) {
          a[i] = cpf.charAt(i);
          if (i < 9) b += (a[i] * --c);
        }

        if ((x = b % 11) < 2) {
          a[9] = 0
        } else {
          a[9] = 11 - x
        }
        b = 0;
        c = 11;

        for (y = 0; y < 10; y++) b += (a[y] * c--);

        if ((x = b % 11) < 2) {
          a[10] = 0;
        } else {
          a[10] = 11 - x;
        }

        if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10])) {
          erro = "Número de CPF inválido.";
        }
      }
    } else {
      if (cpf.length === 0)
        return false
      else
        erro = "Número de CPF inválido.";
    }

    if (erro.length > 0) {
      return false;
    }
    return true;
  }

  retiraFormatacao(CPF): string {
    if (CPF !== '') {
      CPF = CPF.replace(".", "");
      CPF = CPF.replace(".", "");
      CPF = CPF.replace("-", "");
      CPF = CPF.replace("/", "");
    }
    return CPF;
  }

  somenteNumeros(num) {
    let er = /[^0-9;]/;
    let campo = num;
    er.lastIndex = 0;

    if (er.test(campo.value)) {
      campo.value = "";
    }
  }

  maskCPF(CPF) {
    if (CPF.value.length === 3) {
      CPF.value = CPF.value + '.';
    }
    if (CPF.value.length === 7) {
      CPF.value = CPF.value + '.';
    }
    if (CPF.value.length === 11) {
      CPF.value = CPF.value + '-';
    }
  }

  formataCPF(CPF) {
    if (CPF.length === 11) {
      CPF = CPF.substr(0, 3) + '.' +
        CPF.substr(3, 3) + '.' +
        CPF.substr(6, 3) + '-' +
        CPF.substr(9, 2);
    }
    return CPF;
  }

  distanceGPS(lat1: number, lon1: number, lat2: number, lon2: number, unit?: string) {
    let radlat1 = Math.PI * lat1 / 180
    let radlat2 = Math.PI * lat2 / 180
    let theta = lon1 - lon2
    let radtheta = Math.PI * theta / 180
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") {
      dist = dist * 1.609344
    }
    if (unit == "N") {
      dist = dist * 0.8684
    }
    return dist
  }

  getDistanceToCoords(lat1, lon1, lat2, lon2) {
    function _deg2rad(deg) {
      return deg * (Math.PI / 180)
    }

    let R = 6371;
    let dLat = _deg2rad(lat2 - lat1);
    let dLon = _deg2rad(lon2 - lon1);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(_deg2rad(lat1)) * Math.cos(_deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d.toFixed(3);
  }

  public getTodayFormated() {
    let today = new Date();
    let todayFormated = today.getFullYear() + '-' + this.zerofill((today.getMonth() + 1)) + '-' + this.zerofill(today.getDate()) + ' ' +
      this.zerofill(today.getHours()) + ':' + this.zerofill(today.getMinutes()) + ':' + this.zerofill(today.getSeconds());
    return todayFormated;
  }

  public zerofill(n: any): string {
    if ((n + '').length == 1)
      return '0' + n;
    return n.toString();
  }


  public xwwwfurlenc(srcjson) {

    if (srcjson != undefined || srcjson != null) {
        var keys = Object.keys(srcjson);
        var urljson = "";

        for (var i = 0; i < keys.length; i++) {
          //var resultValue = this.xwwwfurlenc(srcjson[keys[i]]);
          var itemValue = srcjson[keys[i]];
          var resultValue = srcjson[keys[i]];
          console.log( "---------value type------------", typeof itemValue)
          if (typeof itemValue == "object") {
            resultValue = this.xwwwfurlenc(itemValue);
          }
          if (resultValue !== "undefined" && resultValue !== null) {
            urljson += encodeURIComponent(keys[i]) + "=" + encodeURIComponent(resultValue);
          }
          if (i < (keys.length - 1)) urljson += "&";
        }
        return urljson;
    }
    return srcjson
  }

}
