const Router = require('express').Router
const routerSV = Router();

// const ControllerSV = require('./controller');
// const controllerSV = new ControllerSV();

//static pages
routerSV.get('/leads.html', async function(req, res) {
    res.render('admin/leads.ejs');
});

//content pages
// routerSV.get('/list', async function(req, res) {
//     const leads = await controllerSV.getLeads(req.query);
//     res.send(leads);
//   });

module.exports = routerSV;