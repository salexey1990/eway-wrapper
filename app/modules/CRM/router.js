const Router = require('express').Router
const routerEW = Router();

const ControllerEW = require('./controller');
const controllerEW = new ControllerEW();

routerEW.get('/leads', async function(req, res) {
  const leads = await controllerEW.getLeads(req.query);
  res.send(leads);
});

routerEW.get('/leads/:id', async function(req, res) {
  const lead = await controllerEW.getLeadById(req.params.id);
  res.send(lead);
})

routerEW.get('/contacts/:id', async function(req, res) {
  const lead = await controllerEW.getContactById(req.params.id);
  res.send(lead);
})

routerEW.get('/webhook', async function(req, res) {
  const response = await controllerEW.webhook(req.query);
  res.send(response)
})

routerEW.post('/lead', async function(req, res) {
  const response = await controllerEW.createLead(req.body);
  res.send(response);
});

module.exports = routerEW;