const routerEW = require('../modules/CRM/router')
const routerSV = require('../modules/supervisor/router')
const Router = require('express').Router

const router = Router();
router.use(routerEW);
router.use(routerSV);

module.exports = router;