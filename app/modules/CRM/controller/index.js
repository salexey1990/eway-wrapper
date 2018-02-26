const ServiceEW = require('../service');
const serviceEW = new ServiceEW();

module.exports = class ControllerEW {
    async getLeads(params) {
        return await serviceEW.getLeads(params);
    }

    async getLeadById(id) {
        return await serviceEW.getLeadById(id);
    }

    async getContactById(id) {
        return await serviceEW.getContactById(id);
    }

    async createLead(params) {
        return await serviceEW.createLead(params);
    }
}