import { Injectable, Inject } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { ParametroDto } from '../../dto/ParametroDto';
import { DataBaseProvider } from './database';

@Injectable()
export class ParametroProvider {

  constructor(private sqlite: SQLite,
    private dbProvider: DataBaseProvider) {
  }

  public get(): any {

    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {

        let sql = 'select * from dm_Parametro order by Id desc limit 1 ';

        return db.executeSql(sql, [])
          .then((result: any) => {
            console.log("ParametroProvider - Get - OK");
            return result;
          })
          .catch((e) => {
            console.error("ParametroProvider - Get - Erro", e);
          });
      });
  }

}
