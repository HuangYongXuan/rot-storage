import {RotStorageDrive, RotStorageDriveData} from "../Type";

export class SessionStorage implements RotStorageDrive {

	get(key: string): any {
		let str = sessionStorage.getItem(key);
		if (!str) return null;
		return JSON.parse(str)
	}

	set(key: string, data: RotStorageDriveData): any {
		return sessionStorage.setItem(key, JSON.stringify(data));
	}

	clear(): any {
		sessionStorage.clear()
	}
}

export default new SessionStorage