import { Injectable, Inject } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { DataBaseProvider } from './database';
import { UserDto } from '../../dto/UserDto';
import { ValidacaoCamposProvider } from '../validacao-campos/validacao-campos';
import { IHttpClientProxy } from '../../services/interfaces/IHttpClientProxy';


@Injectable()
export class UserProvider {

  constructor(
    
    private dbProvider: DataBaseProvider,
    private vcProvider: ValidacaoCamposProvider,
    @Inject('HttpClientProxyToken') private httpClientProxy: IHttpClientProxy) {
  }

  public lastUser(): any {

    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {

        let sql = 'select * from dm_User ' +
          'where logged = 1 ' +
          'and updatedAtISO = (select max(updatedAtISO) from dm_User) ';
        return db.executeSql(sql, [])
          .then((result: any) => {
            console.log("Usuário - lastUsuario - OK");
            return result;
          }).catch((e) => {
            console.error("Usuário - lastUsuario - Erro", e);
          });

      })
      .catch((e) => {
        console.error("Usuário - lastUsuario - Erro", e);
      });

  }


  public authentic(userDto: UserDto): any {

    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {

        let sql = 'select * from dm_User where mail=? and password=? ';
        let data = [userDto.mail, userDto.password];

        return db.executeSql(sql, data)
          .then((result: any) => {
            if (result.rows.length > 0) {
              console.log("Usuário - authentic - OK");
              return true;
            }
            else {
              console.log("Usuário - authentic - OK - Nao existe");
              return false;
            }
          })
          .catch((e) => {
            console.error("Usuário - authentic - Erro", e);
            return false;
          });
      });
  }

  public insert(userDto: UserDto): any {

    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {

        let todayFormated = this.vcProvider.getTodayFormated();

        let sql = 'insert into dm_User ( id, mail, password, name, role, logged, sessionToken, companyId, companyName,updatedatISO	) ' +
          'values ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ';

        let data = [
          userDto.id,
          userDto.mail,
          userDto.password,
          userDto.name,
          userDto.role,
          userDto.logged,
          userDto.sessionToken,
          userDto.companyId,
          userDto.companyName,
          todayFormated
        ];

        return db.executeSql(sql, data).then((r) => {
          console.log('Usuário - Insert - OK', r);
          return true;
        }).catch(e => {
          console.log('Usuário - Insert -  Error', e);
          return false;
        });
      });

  }



  public update(userDto: UserDto) {

    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {

        let todayFormated = this.vcProvider.getTodayFormated();

        let sql = 'update dm_User set  mail= ?, password= ?, name= ?, role=?, companyId= ?, companyName= ?, updatedAtISO= ? ' +
          'where id= ? ';

        let data = [
          userDto.mail,
          userDto.password,
          userDto.name,
          userDto.role,
          userDto.companyId,
          userDto.companyName,
          todayFormated,
          userDto.id
        ];

        return db.executeSql(sql, data)
          .then((ret: any) => {
            console.log("Usuário - Update - Sucesso.");
            return ret;
          })
          .catch((e) => {
            console.error("Usuário - Update - Erro", e);
          });
      });
  }

  public saveOneSignal(OneSignalId: string): any {

    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {

        let todayFormated = this.vcProvider.getTodayFormated();

        //Salva no Ultimo a Logado
        let sql = 'update dm_User set OneSignalId=?, updatedAtISO=? ' +
          'where Codigo = (select Codigo from dm_User order by updatedAtISO desc LIMIT 1) ';

        let data = [
          OneSignalId,
          todayFormated
        ];

        return db.executeSql(sql, data)
          .then((ret: any) => {
            console.log("Usuário - saveOneSignal - Sucesso.");
            return ret;
          })
          .catch((e) => {
            console.error("Usuário - saveOneSignal - Erro", e);
          });
      });
  }


  public logoff(id: string): any {

    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {

        let todayFormated = this.vcProvider.getTodayFormated();

        //Salva no Ultimo a Logado
        let sql = 'update dm_User set logged=0, updatedAtISO=? where id = ? ';

        let data = [
          todayFormated,
          id
        ];


        db.executeSql(sql, data)
          .then((ret: any) => {
            console.log("Usuário - deslogar - Sucesso.", id);
            db.close();
            return true;
          })
          .catch((e) => {
            console.error("Usuário - deslogar - Erro", e);
            return false;
          });
      });
  }

}
