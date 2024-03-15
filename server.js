const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');
var cors = require('cors')
const port = 3000;
const app = express();
app.use(cors()) // this uses default values
app.listen(port, function () {
	console.log("Server is listening at port:" + port);
});

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Parses the text as json
app.use(bodyParser.json());


app.use('/api', api);
