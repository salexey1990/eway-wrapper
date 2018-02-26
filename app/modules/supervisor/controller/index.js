const ServiceSV = require('../service');
const serviceSV = new ServiceSV();

module.exports = class ControllerSV {
    async getLeads(params) {
        return await serviceSV.getLeads(params);
    }

    async getManagers(params) {
        return await serviceSV.getManagers(params);
    }

    async deleteLead(id) {
        return await serviceSV.deleteLead(id);
    }

    async createLead(params) {
        return await serviceSV.createLead(params);
    }
}