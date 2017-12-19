const koa =require('koa');
const app =new koa();
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')()
const logger = require('koa-logger')
const router = require('./app/routes')
//middleware
app.use(bodyparser)
app.use(json())
app.use(logger())
app.use(router.routes())
app.listen(8889);
console.log('app started at port 8889...');
module.exports = app;
