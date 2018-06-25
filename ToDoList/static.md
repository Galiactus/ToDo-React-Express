Пояснение по работе express.static и отдаче файлов

```
    express.static позволяет обработать маршрут / если в docs есть index.html
    (это файл по умолчанию)
      но это можно перенастроить express.static('docs', { index: ['i.html'] })

    если файла, который настроен как индексный, нет в папке
    и нет обработчика маршрута /
    то это 404
    иначе
      если обработчик присутствует
        то в mjs нужно указывать root
        иначе Error: TypeError: path must be absolute or specify root to res.sendFile
        т.е.
        нужно
          .get('/', r => r.res.sendFile('docs/i.html', { root: '.' }))
                                                       вот эта точка
                                                        отсылает к docs
              а если мы хотим клиентский роутер
              .get('/author', r1)
              .get('/env', r2)
              .get('/port', r3)
              .get('/*', r => r.res.sendFile('docs/i.html', { root: '.' }))


    маршрут .get('/', r => r.res.sendFile('docs/index.html'))
```
