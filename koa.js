const koa =require('koa');
const app =new koa();
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')()
const logger = require('koa-logger')
const router = require('./app/routes/api')
const request = require('koa-http-request')
const cors = require('koa2-cors')
const WebSocket = require('ws')
const event = require('./app/controllers/event')
//middleware
app.use(cors())
app.use(bodyparser)
app.use(json())
app.use(request({
    dataType: 'json'
}))
app.use(logger())
app.use(router.routes())
app.listen(8888)
//ws
// ! rest服务器不使用请注释ws部分, 否则报错
const ws = new WebSocket('ws://localhost:3000')
ws.on('open', function open() {
   console.log('success connect to the server')
   ws.on("message", event.notify)
 })
console.log('app started at port 8888...')
module.exports = app
