import { Injectable } from '@angular/core';

import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  db: SQLiteObject;
  databaseName = 'printfinger.db';
  constructor(private sqLite: SQLite, private sqlitePorter: SQLitePorter) { }

  async openDatabase() {
    try {
      this.db = await this.sqLite.create({
        name: this.databaseName,
        location: 'default',
      });
      await this.createDatabase();
    } catch (error) {
      console.log('Ocorreu um erro ao criar o banco de dados', error);
    }
  }

  async createDatabase() {
    const sqlCreateDatabase = this.getCreateTable();
    const result = await this.sqlitePorter.importSqlToDb(
      this.db,
      sqlCreateDatabase
    );
    return result ? true : false;
  }

  getCreateTable() {
    const sqls = [];
    sqls.push(
      'CREATE TABLE IF NOT EXISTS user(id integer primary key AUTOINCREMENT, name varchar(100), password varchar(60));'
    );
    return sqls.join('\n');
  }

  excecuteSQL(sql: string, params?: any[]) {
    return this.db.executeSql(sql, params);
  }
}
