const koa =require('koa');
const app =new koa();
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')()
const logger = require('koa-logger')
const router = require('./app/routes/api')
const ws = require('ws')
//middleware
app.use(bodyparser)
app.use(json())
app.use(logger())
app.use(router.routes())
app.listen(8889)
//ws
const ws = new WebSocket('ws://localhost:3000')
ws.on('open', function open() {
    console.log('success connect to the server')
  })
ws.on('message', )
console.log('app started at port 8889...')
module.exports = app
