import {RotStorageDrive, RotStorageDriveData} from "../Type";

export class LocalStorage implements RotStorageDrive {

	get(key: string): any {
		let str = localStorage.getItem(key);
		if (!str) return null;
		return JSON.parse(str)
	}

	set(key: string, data: RotStorageDriveData): any {
		return localStorage.setItem(key, JSON.stringify(data));
	}

	clear(): any {
		localStorage.clear()
	}
}

export default new LocalStorage()