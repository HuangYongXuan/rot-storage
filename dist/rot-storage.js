!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.RotStorage=t():e.RotStorage=t()}(window,(function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(1),i=r(2),o=r(3),s=r(4);e.exports={RotStorage:n.default,drive:{SessionStorage:i.SessionStorage,LocalStorage:o.LocalStorage,IndexedDB:s.IndexedDB}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e){this.config=e}set(e,t,r=0){return this.config.drive.set(e,{expire:r,data:t})}get(e){let t=this.config.drive.get(e);if(t){if(t instanceof Promise)return t.then(t=>{if(!(0!==t.expire&&t.expire<(new Date).getTime()))return t.data;this.config.drive.set(e,{expire:-1,data:""})});if(!(0!==t.expire&&t.expire<(new Date).getTime()))return t.data;this.config.drive.set(e,{expire:-1,data:""})}}clear(){return this.config.drive.clear()}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SessionStorage=void 0;class n{get(e){let t=sessionStorage.getItem(e);return t?JSON.parse(t):null}set(e,t){return sessionStorage.setItem(e,JSON.stringify(t))}clear(){sessionStorage.clear()}}t.SessionStorage=n,t.default=new n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.LocalStorage=void 0;class n{get(e){let t=localStorage.getItem(e);return t?JSON.parse(t):null}set(e,t){return localStorage.setItem(e,JSON.stringify(t))}clear(){localStorage.clear()}}t.LocalStorage=n,t.default=new n},function(e,t,r){"use strict";var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function s(e){try{u(n.next(e))}catch(e){o(e)}}function a(e){try{u(n.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,a)}u((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.IndexedDB=void 0;t.IndexedDB=class{constructor(e,t){this.tableName=t,this.request=indexedDB.open(e,100)}init(){return n(this,void 0,void 0,(function*(){yield new Promise((e,t)=>{this.request.onsuccess=()=>{this.DB=this.request.result,e()},this.request.onupgradeneeded=t=>{this.DB=t.target.result,!1===this.DB.objectStoreNames.contains(this.tableName)&&(this.ObjectStore=this.DB.createObjectStore(this.tableName,{keyPath:"key"}),this.ObjectStore.createIndex("key","key",{unique:!0}),this.ObjectStore.createIndex("expire","expire",{unique:!1}),this.ObjectStore.createIndex("data","data",{unique:!1})),e()},this.request.onerror=e=>{t(e)}})}))}clear(){this.DB.transaction([this.tableName],"readwrite").objectStore(this.tableName).clear()}get(e){return n(this,void 0,void 0,(function*(){return this.DB||(yield this.init()),yield this.getItem(e)}))}set(e,t){this.addItem(e,t).onerror=r=>{"Key already exists in the object store."===r.target.error.message&&this.putItem(e,t)}}getItem(e){return n(this,void 0,void 0,(function*(){this.DB||(yield this.init());let t=this.DB.transaction([this.tableName],"readonly").objectStore(this.tableName).get(e);return yield new Promise((e,r)=>{t.onsuccess=()=>{e(t.result)},t.onerror=function(e){r(new Error("transaction failure"))}})}))}addItem(e,t){return this.DB.transaction([this.tableName],"readwrite").objectStore(this.tableName).add(Object.assign({key:e},t))}putItem(e,t){return this.DB.transaction([this.tableName],"readwrite").objectStore(this.tableName).put(Object.assign({key:e},t))}}}])}));