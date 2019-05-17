var http = require('http');
var https = require('https');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var route = require('./route.js');
var mongodb = require('mongodb');
var mongo = require('./src/mongo-connect');
var fs = require('fs');
var cors = require('cors');
var middle = require('./src/middleware');
var express_graphql = require('express-graphql');
var graphvar = require('./src/graphql');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, navPlugin');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Access-Control-Allow-Headers, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/graphql', cors(), express_graphql({
	schema: graphvar.schema,
	rootValue: graphvar.root,
	graphiql: true
}));

app.all('*', middle.beforeEndPoint);

app.use('/', route);

app.use(express.static(__dirname + '/public',{ redirect : false }));
app.use(express.static(__dirname + '/plugin',{ redirect : false }));

const privateKey = fs.readFileSync('/etc/letsencrypt/live/qrcode.wearesqood.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/qrcode.wearesqood.com/fullchain.pem', 'utf8');
// const privateKey = fs.readFileSync('privkey.pem', 'utf8');
// const certificate = fs.readFileSync('fullchain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(3000, () => {
	console.log('HTTP Server running on port 3000');
});