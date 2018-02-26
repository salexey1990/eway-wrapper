const LeadModel = require('../models/leads')

const lodash = require('lodash');

module.exports = class ServiceSV {
    async getLeads(params) {
        return await LeadModel.findAll();
    }
}