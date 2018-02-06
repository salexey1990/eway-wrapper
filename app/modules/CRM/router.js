const Router = require('express').Router
const routerEW = Router();

const ControllerEW = require('./controller');
const controllerEW = new ControllerEW();

routerEW.get('/leads', async function(req, res) {
  const leads = await controllerEW.getLeads(req.query);
  res.send(leads);
});


module.exports = routerEW;