
var rp = require('request-promise');
var express = require('express');
var app = express();
var body_parser = require('body-parser');

app.use(body_parser.urlencoded({ extended: false }));    // for GET requeests
app.use(body_parser.json()); 
// app.set('port', process.env.PORT || 3000 );//required
function rp_async(url,options) {
    return new Promise((resolve,reject) => {
        rp(url,options).then(function (json_string) {
            resolve(json_string);
        }).catch(function (err){
            console.log(err);
            reject("ERROR");
        });
    });
}

app.listen(process.env.PORT || 3000);
app.get('/getRandom', function(req,res){
    res.send(JSON.stringify({"random": Math.round(Math.random()*10000)}));
});

app.post('/getNearestLocations', async function (req, res) {
    console.log(req.body);
    var stringToSearch = req.body.data;//AIzaSyDPFM0v7qdeOc99d5VlfnRYMUgqs_gUxu4
    
    var data = await rp_async(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${stringToSearch}&key=AIzaSyBYmI-ajSqWSI7lzFwlpS2VndxFDB9AaCk`,{method:'post'});
  //  var data = await rp_async(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=~${stringToSearch}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyBoJFhnn_8nwQltsj496SeNCN4lk03qf9w`,{method:'get'});
    data = JSON.parse(data);
    console.log(data);
    console.log(JSON.stringify(data));
    res.send(`Location obtained. \n${JSON.stringify(data)}`);
});