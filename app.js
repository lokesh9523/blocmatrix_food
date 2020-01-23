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
// app.use(function(req, res, next) {
// 	res.setHeader("Access-Control-Allow-Origin", "*");
// 	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
// 	res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
// 	next();
//   });
//console.log("Server Started in " + environment.toUpperCase() + " mode")
//let suffix = (environment === 'demo') ? '/demo' : '/v3'
function allowCrossDomain (req, res, next){
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
};
app.use(allowCrossDomain);

let suffix = '';
app.use(suffix, index);
app.use(express.static(__dirname));
// //The following code will be used for ejs view
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
    //console.log("I am in error", err.message, err.code);
	if(err.status){
		res.status(err.status);
	}
	else{
		res.status(403);
	}
	res.send({
		data: err.message
	});
});

export default app;
