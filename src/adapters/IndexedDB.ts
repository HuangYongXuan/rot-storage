import {RotStorageDrive, RotStorageDriveData} from "../Type";

export class IndexedDB implements RotStorageDrive {
	protected DB: IDBDatabase;
	protected ObjectStore: IDBObjectStore;
	protected tableName: string

	constructor(databaseName: string, tableName: string) {
		this.tableName = tableName;
		let request = indexedDB.open(databaseName, 9527);
		request.onsuccess = () => {
			this.DB = request.result;
		}

		request.onupgradeneeded = (event) => {
			this.DB = event.target["result"];
			if (this.DB.objectStoreNames.contains(tableName) === false) {
				this.ObjectStore = this.DB.createObjectStore(tableName, {keyPath: 'key'})
				this.ObjectStore.createIndex('key', 'key', {unique: true});
				this.ObjectStore.createIndex('expire', 'expire', {unique: false});
				this.ObjectStore.createIndex('data', 'data', {unique: false});
			}
		}
	}

	clear(): any {
		this.DB.transaction([this.tableName], 'readwrite').objectStore(this.tableName).clear()
	}

	// @ts-ignore
	async get(key: string): any {
		return await this.getItem(key)
	}

	set(key: string, data: RotStorageDriveData): any {
		this.addItem(key, data).onerror = (err) => {
			if ('Key already exists in the object store.' === err.target['error'].message) {
				this.putItem(key, data)
			}
		}
	}

	// @ts-ignore
	protected async getItem(key: string): any {
		let transaction = this.DB.transaction([this.tableName], 'readonly');
		let objectStore = transaction.objectStore(this.tableName);
		let request = objectStore.get(key);
		return await new Promise((resolve, reject) => {
			request.onsuccess = () => {
				resolve(request.result)
			}
			request.onerror = function (event) {
				reject(new Error('transaction failure'))
			};
		})
	}

	protected addItem(key: string, value: object) {
		return this.DB.transaction([this.tableName], 'readwrite').objectStore(this.tableName).add({key, ...value});
	}

	protected putItem(key: string, value: object) {
		return this.DB.transaction([this.tableName], 'readwrite').objectStore(this.tableName).put({key, ...value});
	}
}