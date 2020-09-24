import {RotStorageDrive, RotStorageDriveData} from "../Type";

export class IndexedDB implements RotStorageDrive {
	protected DB: IDBDatabase;
	protected ObjectStore: IDBObjectStore;
	protected tableName: string
	protected request: IDBOpenDBRequest

	// @ts-ignore
	constructor(databaseName: string, tableName: string) {
		this.tableName = tableName;
		this.request = indexedDB.open(databaseName, 100);
	}

	async init() {
		await new Promise(((resolve, reject) => {
			this.request.onsuccess = () => {
				this.DB = this.request.result;
				resolve();
			}

			this.request.onupgradeneeded = (event) => {
				this.DB = event.target["result"];
				if (this.DB.objectStoreNames.contains(this.tableName) === false) {
					this.ObjectStore = this.DB.createObjectStore(this.tableName, {keyPath: 'key'})
					this.ObjectStore.createIndex('key', 'key', {unique: true});
					this.ObjectStore.createIndex('expire', 'expire', {unique: false});
					this.ObjectStore.createIndex('data', 'data', {unique: false});
				}
				resolve();
			}
			this.request.onerror = (err) => {
				reject(err)
			}
		}))
	}

	clear(): any {
		this.DB.transaction([this.tableName], 'readwrite').objectStore(this.tableName).clear()
	}

	// @ts-ignore
	async get(key: string): any {
		if (!this.DB) await this.init()
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
		if (!this.DB) await this.init()
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