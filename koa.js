const koa =require('koa');
const app =new koa();
const router = require('koa-router')();
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror =require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const server = require('koa-static');
const index = require('./routes/index');
const users = require('./routes/users');

//middleware

app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(convert(server(__dirname+'/public')));
router.use('/',index.routes(),index.allowedMethods());
router.use('/users',users.routes(),users.allowedMethods());

app.use(router.routes(),router.allowedMethods());


module.exports = app;
