const router = require('koa-router')()
var edit = require('../controllers/edit.js')
var login = require('../controllers/login.js')

router.post('/login', login)
router.post('/edit', edit.edit)
router.post('/changePassword', edit.changePassword)
module.exports = router