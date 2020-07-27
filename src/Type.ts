export interface RotStorageDriveData {
	expire: Number,
	data: any
}

export interface RotStorageDrive {
	get(key: string): any,

	set(key: string, data: RotStorageDriveData): any,

	clear(): any
}

export interface RotStorageConfig {
	drive: RotStorageDrive
}
