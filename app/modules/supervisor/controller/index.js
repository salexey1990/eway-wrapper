const ServiceSV = require('../service');
const serviceSV = new ServiceSV();

module.exports = class ControllerSV {
    async getLeads(params) {
        return await serviceSV.getLeads(params);
    }
}