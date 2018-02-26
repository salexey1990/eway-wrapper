const ServiceSV = require('../service');
const serviceSV = new ServiceSV();

module.exports = class ControllerSV {
    async getLeads(params) {
        return await serviceSV.getLeads(params);
    }

    async deleteLead(id) {
        return await serviceSV.deleteLead(id);
    } 
}