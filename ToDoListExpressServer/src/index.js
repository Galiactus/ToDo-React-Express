const express = require('express');
const bodyParser = require('body-parser');
const { get } = require('axios');
const fetch = require('node-fetch');
const URL = 'https://kodaktor.ru/j/db.json';
const taskURL = 'http://localhost:3000/task';
const PORT = 4321;
const app = express();
app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))
    .use(function (req, res, next) {
        res.header('Content-Type', 'application/json');
        res.header("Access-Control-Allow-Origin", "*"),
        next();
    })
   .get(/getlist/, async r => {
        const todo = await fetch(taskURL).then(response => response.json()).then(ret=>{return ret;});
        r.res.end(JSON.stringify(todo));
    })
    .get(/reset/, async r => {
        let todo = await fetch(URL).then(response => response.json()).then(ret=>{return ret;});
        todo.author.name='Skorobogatov Kirill';
        const updater = await fetch('http://localhost:3000/task',{
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
              },
            body: JSON.stringify(todo)
        })
        .then(response => response.json())
        .then(data => {return data;});
        r.res.end(JSON.stringify(updater));
    })
   .get(/update/, async r =>{
        const todo = await fetch('http://localhost:3000/task',{
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
              },
            body: r.query.body
        })
        .then(response => response.json())
        .then(data => {return data;});
        r.res.end(JSON.stringify(todo));

    })
   .use(r => r.res.status(404).end('Still not here, sorry!'))
   .use((e, r, res, n) => res.status(500).end('Error: ${e}'))
   .set('view engine', 'pug')
   .listen(process.env.PORT || PORT, async () => {
    console.log(process.pid);
    ({data: {users: items}} = await get(URL));
  });
