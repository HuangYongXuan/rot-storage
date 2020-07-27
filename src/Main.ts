/**
 * @module		main ts
 * @author      nayo
 * @date        2020/7/27 8:49 上午
 * @version     1.0
 */
import RotStorage from "./class/RotStorage";
import {SessionStorage} from './adapters/SessionStorage';
import {LocalStorage} from './adapters/LocalStorage';
import {IndexedDB} from './adapters/IndexedDB';

module.exports = {
	RotStorage,
	drive: {
		SessionStorage,
		LocalStorage,
		IndexedDB
	}
};