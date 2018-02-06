const routerEW = require('../modules/CRM/router')
const Router = require('express').Router

const router = Router();
router.use(routerEW);

module.exports = router;