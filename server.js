
var rp = require('request-promise');
var express = require('express');
var app = express();
var body_parser = require('body-parser');
var conf = require('./conf.json');

app.use(body_parser.urlencoded({ extended: false }));    // for GET requeests
app.use(body_parser.json()); 
// app.set('port', process.env.PORT || 3000 );//required

app.listen(process.env.PORT || 3000);
app.get('/getRandom', function(req,res){
    res.send(JSON.stringify({"random": Math.round(Math.random()*10000)}));
});

app.post('/getNearestLocations', async function (req, res) {
    console.log(req.body);
    var stringToSearch = req.body.data;
    
    var data = await rp(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${stringToSearch}&key=${conf.key.test}`,{method:'get'});

    data = JSON.parse(data);
    
    console.log(data);
    console.log(JSON.stringify(data));

    res.send(`Location obtained. \n${JSON.stringify(data)}`);
});