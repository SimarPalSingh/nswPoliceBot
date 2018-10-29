
var rp = require('request-promise');
var express = require('express');
var app = express();
// app.set('port', process.env.PORT || 3000 );//required
app.listen(process.env.PORT || 3000);
app.get('/getRandom', function(req,res){
    res.send(JSON.stringify({"random": Math.round(Math.random()*10000)}));
});

app.post('/getNearestLocations', async function (req, res) {
    var stringToSearch = JSON.stringify(req.body).data;
 
    var data = await rp_async(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=~${stringToSearch}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyBoJFhnn_8nwQltsj496SeNCN4lk03qf9w`,{method:'get'});
    data = JSON.parse(data);
    
    res.send(`Location obtained. \n${JSON.stringify(data)}`);
});