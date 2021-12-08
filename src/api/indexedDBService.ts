import { IDBPDatabase, openDB } from 'idb';

export default class IndexDB {
  private db: any;

  public async dbPromise() {
    return openDB("notesappdb", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('notesOS')) db.createObjectStore("notesOS");
      }
    });
  };

  public async getAllItems(tableName: string) {
    this.db = await this.dbPromise();
    const tx = this.db.transaction(tableName, 'readonly');
    const store = tx.objectStore(tableName);
    const result = await store.getAll();
    this.db.close();
    return result;
  }

  public async getItem(tableName: string, id: string) {
    this.db = await this.dbPromise();
    const tx = this.db.transaction(tableName, 'readonly');
    const store = tx.objectStore(tableName);
    const result = await store.get(id);
    this.db.close();
    return result;
  }

  public async saveToStorage(tableName: string, item: object, id: string) {
    this.db = await this.dbPromise();
    console.log(this.db)
    const tx = this.db.transaction(tableName, 'readwrite');
    const store = tx.objectStore(tableName);
    const result = await store.put(item, id);
    this.db.close();
    return result;
  }

  public async removeFromStorage(tableName: string, id: string) {
    this.db = await this.dbPromise();
    const tx = this.db.transaction(tableName, 'readwrite');
    const store = tx.objectStore(tableName);
    const result = await store.get(id);
    if (!result) {
      console.log('Id not found', id);
      return result;
    }
    await store.delete(id);
    this.db.close();
    return id;
  }
}