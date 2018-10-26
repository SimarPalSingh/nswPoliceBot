var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000 );//required

app.get('*', function(res){
    res.write(JSON.stringify({"random": Math.random()*9999}));
});