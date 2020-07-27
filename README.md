# rot-storage
可以设置过期时间的storage 包括驱动设置

##  安装

```
yarn add rot-storage
```

## 使用
```html
<script src="rot-storage.js"></script>
<script>
	let store = new RotStorage.RotStorage({drive: new RotStorage.drive.SessionStorage()})

	store.get('key')
	store.set('key', 'data', [expireTime = new Date.getTime() + 100000]);
	store.clear()
</script>
```
支持 drive：
`` RotStorage.drive.LocalStorage(); RotStorage.drive.SessionStorage(); RotStorage.drive.IndexedDB(database, tableName)
``
当储存驱动为 IndexedDB 时，get方法将返回一个 promise 