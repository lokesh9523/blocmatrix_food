import core from './core';
import express from 'express';
import path from 'path';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql';
//Initialize the Data Base
import config from './config';
import models from './models';
var app = express();

/*app.use(morgan('combined', {
	stream: logger.stream
}));*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());

var index = require('./routes/index')(app);
//console.log("Server Started in " + environment.toUpperCase() + " mode")
//let suffix = (environment === 'demo') ? '/demo' : '/v3'
let suffix = '';
app.use(suffix, index);

//The following code will be used for ejs view
/*app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');*/
// catch 404 and forward to error handler
/*app.use(function (req, res, next) {
	var err = new Error(404);
	next(err);
});*/

// error handler
app.use(function (err, req, res, next) {
	/*let errorMessage;
	errorMessage = message.generateErrorMessage(err);
	res.status(errorMessage.status || 422);
	res.send(errorMessage);*/
    console.log(err);
});

export default app;
