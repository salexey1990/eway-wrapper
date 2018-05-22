const LeadModel = require('../models/leads');
const ManagerModel = require('../models/managers');

const lodash = require('lodash');

module.exports = class ServiceSV {
    async getLeads(params) {
        return await LeadModel.findAll({
            order: [['date', 'DESC']]
        });
    }

    async getManagers(params) {
        return await ManagerModel.findAll();
    }

    async deleteLead(id) {
        return await LeadModel.destroy({
            where: {
                id: id
            }
        })
    }

    async createLead(params) {
        if (!params.visit) {
            return {
                status : "ok",
                order_id : params.id
            }
        }
        const resource = JSON.stringify(params)
        const newLead = {
            date: params.created_date,
            resource: resource || 'не известен',
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