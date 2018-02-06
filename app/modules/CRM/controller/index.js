const ServiceEW = require('../service');
const serviceEW = new ServiceEW();

module.exports = class ControllerEW {
    async getLeads(params) {
        return await serviceEW.getLeads(params);
    }
}