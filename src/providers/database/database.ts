import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
 
@Injectable()
export class DataBaseProvider {
 
  constructor(private sqlite: SQLite) { }
 
  /**
   * Cria um banco caso não exista ou pega um banco existente com o nome no parametro
   */
  public getDB() {

      return this.sqlite.create({ name: 'repassauto.db', location: 'default', createFromLocation: 1 });
    }
 
  /**
   * Cria a estrutura inicial do banco de dados
   */
  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
 
        console.log("Banco de dados - repassauto.db - criado e aberto com sucesso.");
        // Criando as tabelas
        //this.createTables(db);
 
        // Inserindo dados padrão
        //this.insertDefaultItems(db);
 
      })
      .catch(e => console.error(e));
  }
 
  /**
   * Criando as tabelas no banco de dados
   * @param db
   */
  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    // db.sqlBatch([
    // ])
    //   .then(() => console.log('Tabelas criadas'))
    //   .catch(e => console.error('Erro ao criar as tabelas', e));
  }
 
  /**
   * Incluindo os dados padrões
   * @param db
   */
  private insertDefaultItems(db: SQLiteObject) {
    // db.executeSql('select COUNT(id) as qtd from dm_Ofertas', {})
    // .then((data: any) => {
    //   //Se não existe nenhum registro
    //   if (data.rows.item(0).qtd == 0) {
 
    //     // Criando as tabelas
    //     db.sqlBatch([
    //     ])
    //       .then(() => console.log('Dados padrões incluídos'))
    //       .catch(e => console.error('Erro ao incluir dados padrões', e));
 
    //   }
    // })
    // .catch(e => console.error('Erro ao consultar a qtd de categorias', e));
  }
}
