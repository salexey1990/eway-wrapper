const LeadModel = require('../models/leads')

const lodash = require('lodash');

module.exports = class ServiceSV {
    async getLeads(params) {
        return await LeadModel.findAll();
    }

    async deleteLead(id) {
        return await LeadModel.destroy({
            where: {
                id: id
            }
        })
    }
}