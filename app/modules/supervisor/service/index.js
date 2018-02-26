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

    async createLead(params) {
        const newLead = {
            date: params.created_date,
            resource: params.title || 'не известен',
            comment: params.text || null,
            name: params.name || null,
            phone: params.phone || null,
            email: params.email || null,
            promo: params.visit || null
        }
        const res = await LeadModel.create(newLead);
        if (res) {
            return {
                status : "ok",
                order_id : params.id
            }
        } else {
            return null;
        }
    }
}