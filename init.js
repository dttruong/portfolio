var koa = require('koa');
var http = require('http');
var https = require('https');
var app = koa();
require('dotenv').load();
var bodyParser = require('koa-bodyparser');
var router = require('koa-router')();
var render = require('koa-ejs');
var path = require('path');
var serve = require('koa-static');
var knex = require('koa-knex');
var cookieRepo = require('./repositories/cookie-repository');
var enforceHttps = require('koa-sslify');

app.keys = [process.env.APP_SECRET_KEY];

if(process.env.SSL_OFF !== '1')
    app.use(enforceHttps({temporary: true}));

app.use(bodyParser());

//app.use(cookieRepo());

app.use(knex({
    client: 'pg',
    connection: {
        host     : process.env.DB_HOST,
        user     : process.env.DB_USER,
        password : process.env.DB_USER_PASSWORD,
        database : process.env.DB_NAME
    }
}));

var requestTime = function (headerName){ // define middleware
    return function *(next){
        var start = new Date();
        yield next; // pass control to downstream middleware functions
        // when all is done, record end date
        var end = new Date();
        var ms = end - start;
        console.log('%s %s - %sms', this.method, this.url, ms);
    }
}

app.use(requestTime());

render(app, {
    root: path.join(__dirname, 'views'),
    viewExt: 'ejs',
    template: 'layout',
    layout: '_layout',
    locals: {
	    site_title: 'Teevo\'s KOA Starter Template',
	    page_css: '',
	    page_title: ''
    },
    cache: false,
    debug: true
});

app.use(serve('public'));

require('./routes/init')(router);
app.use(router.routes());

if(process.env.SSL_OFF !== '1') { // use HTTPS
    console.log("App listening via HTTPS listening on " + 443);
    https.createServer(app.callback()).listen(443);
}
else { // use HTTP
    http.createServer(app.callback()).listen(process.env.PORT || 5000);
    console.log("App listening via HTTP listening on " + process.env.PORT || 5000);
}