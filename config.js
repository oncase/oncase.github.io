


var express = require('express');
app = express();

app.use(express.static(__dirname + '/public'));
// app.use(express.static('index.html'));

app.listen(8080);
