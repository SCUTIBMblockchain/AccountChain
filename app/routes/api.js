const router = require('koa-router')
var edit = require('../controllers/edit.js')
var login = require('../controllers/login.js')

router.post('/log', login)
router.post('/edit', edit)

module.exports = router