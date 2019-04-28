const express = require('express');
const http = require('http');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const bodyParser = require('body-parser');

let app = express();

app.set('port', 12000);

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req, res){
    res.render('main', {});
});

app.post('/', function(req, res){
    let nickname = req.body.nickname;
    let url = "http://dunfa.gondr.net/char/result?server=all&name=" + nickname;
    request(url, function(err, response, body){
        let list = [];
        $ = cheerio.load(body);

        let charList = $(".char_name");

        for(let i = 0; i < charList.length; i++){
            let msg = $(charList[i]).text();
            list.push(msg);
        }

        res.render('main', {msg:'검색 결과', list:list});
    });
});

let server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log(`Express 엔진이 ${app.get('port')}에서 실행중`);
});