import {RotStorageConfig} from "../Type";


export default class RotStorage {
    protected config;

    constructor(config: RotStorageConfig) {
        this.config = config
    }

    /**
     * 写入
     * @param key
     * @param data
     * @param expireTime
     */
    set(key: string, data: Object, expireTime: number = 0) {
        return this.config.drive.set(key, {expire: expireTime, data})
    }

    /**
     * 获取
     * @param key
     */
    get(key: string) {
        let json = this.config.drive.get(key)
        if (!json) {
            return undefined;
        }
        if (json instanceof Promise) {
            return json.then(res => {
                if (!res) return undefined;
                if (res.expire !== 0 && res.expire < new Date().getTime()) {
                    this.config.drive.set(key, {expire: -1, data: ''})
                    return undefined;
                }
                return res.data;
            })
        } else if (json.expire !== 0 && json.expire < new Date().getTime()) {
            this.config.drive.set(key, {expire: -1, data: ''})
            return undefined;
        }
        return json.data
    }

    clear() {
        return this.config.drive.clear()
    }
}