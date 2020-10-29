import {RotStorageDrive, RotStorageDriveData} from "../Type";
import * as localForage from "localforage";

export class IndexedDB implements RotStorageDrive {
    // @ts-ignore
    constructor(databaseName: string, tableName: string) {
        localForage.config({
            driver: localForage.INDEXEDDB,
            name: databaseName,
            version: 1.0,
            size: 4980736,
            storeName: tableName,
            description: ''
        });
    }

    // @ts-ignore
    async get(key: string): any {
        return await localForage.getItem(key)
    }

    set(key: string, data: RotStorageDriveData): any {
        return localForage.setItem(key, data)
    }

    clear(): any {
        return localForage.clear()
    }
}