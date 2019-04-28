const express = require('express');
const http = require('http');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const bodyParser = require('body-parser');  //여기

let app = express();

app.set('port', 12000);

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json()); //미들웨어로 바디파서를 사용함. //여기
app.use(bodyParser.urlencoded({extended:true})); //여기

app.get('/', function(req, res){

    request("http://dunfa.gondr.net/char/result?server=all&name=swag", function(err, response, body){
        let list = [];
        $ = cheerio.load(body);

        let charList = $(".char_name");

        for(let i = 0; i < charList.length; i++){
            let msg = $(charList[i]).text();
            list.push(msg);
        }

        res.render('dunfa', {msg:'던파 캐릭터 이름', list:list});
    });
});

let server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log(`Express 엔진이 ${app.get('port')}에서 실행중`);
});


