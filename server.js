var express = require('express');
var app = express();

app.get('*', function(res){
    res.write(JSON.stringify({"random": Math.random()*9999}));
})