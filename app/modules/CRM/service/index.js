const Wrapper = require('../components/eway');
const config = require('../../../../config');
const wrapper = new Wrapper(config.eWayURL, config.eWayUser, config.eWayPswd);

const lodash = require('lodash');

module.exports = class ServiceEW {
    async getLeads(params) {
        const find = {
            AdditionalFields: {
                af_45: 'true'
            }
        }
        const leads = await wrapper.searchEntity('Leads', find);
        let res = {
            statuses: [
                {id: 1, name: 'Новый'},
                {id: 2, name: 'В работе'}
            ]
        }
        const orders = lodash.compact(leads.Data.map((order) => {
            let day = order.ItemChanged.substring(0,2);
            let month = order.ItemChanged.substring(3,5);
            let rest = order.ItemChanged.substring(6);
            if (new Date(params.date*1000) <= new Date(`${month}.${day}.${rest}`)) {
                return {
                    id: order.ItemGUID,
                    name: order.FileAs,
                    date_create: order.ItemCreated,
                    status: order.StateEn,
                    price: order.Price,
                    cost: null,
                    roistat: null,
                    client_id: order.Customer
                }
            }
        }))
        res.orders = orders;
        return res;
    }

    async getLeadById(id) {
        const find = {
            ItemGUID: id
        }
        return await wrapper.searchEntity('Leads', find);
    }

    async getContactById(id) {
        const find = {
            ItemGUID: id
        }
        return await wrapper.searchEntity('Contacts', find);
    }

    async webhook(params) {
        return await wrapper.saveEntity('Lead', params)
    }
}