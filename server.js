var express = require('express');
var app = express();
// app.set('port', process.env.PORT || 3000 );//required
app.listen(process.env.PORT || 3000);
app.get('/getRandom', function(res){
    res.send(JSON.stringify({random: "Math.random()*9999"}));
});