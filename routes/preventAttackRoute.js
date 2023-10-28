const {Router} = require('express')
const {getDataXss, getClickJacking, createClickJacking} = require('../controller/preventAttackControl')

const preventRoute = Router()

preventRoute.get('/xss', getDataXss)
preventRoute.get('/click-jacking', getClickJacking)
preventRoute.post('/click-jacking', createClickJacking)

module.exports = preventRoute