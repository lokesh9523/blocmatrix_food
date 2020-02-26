/**
 * Module dependencies.
 */

import {
	install
} from 'source-map-support'
install();
import app from './../app';
import * as WebSocket from 'ws';
import {
	Ethereum as ethereum
} from '../controllers/Partners/ethereum';
var cron = require('node-cron');
var debug = require('debug')('base-arch:server');
var http = require('http')
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
export const wss = new WebSocket.Server({ server });
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
      console.log(`Account ID: ${message} is connected through Websocket`);
  });
});
wss.on('listening', function listen(){
  console.log(`Websocket Connected on port ${port}`);
});
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => console.log('Server is Listening on ' + port));
server.on('error', onError);
server.on('listening', onListening);
/**
 * Normalize a port into a number, string, or false.
 */
const Web3 = require('web3');
const yamlConfig = require('yaml-config');

const config = yamlConfig.readConfig('config.yml');
const wsURL = config.wsURL
export const web3 = new Web3(Web3.givenProvider || new Web3.providers.WebsocketProvider(wsURL));

const provider = new Web3.providers.WebsocketProvider(wsURL);
provider.on('error', e => console.error('WS Error', e));
provider.on('end', e => console.error('WS End', e));
provider.on('connect', () => { console.log('Ethereum Blockchain Connected\n-----------------------------');

ethereum.trackBlockchain() });



function normalizePort(val) {
	var port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	var bind = typeof port === 'string' ?
		'Pipe ' + port :
		'Port ' + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
	case 'EACCES':
		console.error(bind + ' requires elevated privileges');
		process.exit(1);
		break;
	case 'EADDRINUSE':
		console.error(bind + ' is already in use');
		process.exit(1);
		break;
	default:
		throw error;
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	var addr = server.address();
	var bind = typeof addr === 'string' ?
		'pipe ' + addr :
		'port ' + addr.port;
	debug('Listening on ' + bind);
}
