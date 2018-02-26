const Wrapper = require('../components/eway');
const config = require('../../../../config');
const wrapper = new Wrapper(config.eWayURL, config.eWayUser, config.eWayPswd);

const lodash = require('lodash');

module.exports = class ServiceEW {
    async getLeads(params) {

        const leads = await wrapper.getEntity('Leads');
        const statArr = [
            'dcec2644-c590-11e5-903f-6466b305cde0',
            'e14f81b0-bf7a-11e5-bda1-6466b305cde0',
            '73a9fde6-c041-11e5-8ef2-6466b305cde0',
            'bc14312b-c041-11e5-8ef2-6466b305cde0',
            '90c78af1-65ac-49e3-8e32-88f23b32ef03',
            '037a8b0c-be7f-11e5-9558-6466b305cde0',
            '94f0b2b4-c041-11e5-8ef2-6466b305cde0'
        ]
        let res = {
            statuses: [
                {id: 'dcec2644-c590-11e5-903f-6466b305cde0', name: 'Отгружен'},
                {id: 'e14f81b0-bf7a-11e5-bda1-6466b305cde0', name: 'Есть интерес'},
                {id: '73a9fde6-c041-11e5-8ef2-6466b305cde0', name: 'Счёт'},
                {id: 'bc14312b-c041-11e5-8ef2-6466b305cde0', name: 'Отвал'},
                {id: '90c78af1-65ac-49e3-8e32-88f23b32ef03', name: 'Новый'},
                {id: '037a8b0c-be7f-11e5-9558-6466b305cde0', name: 'Квалифицирован'},
                {id: '94f0b2b4-c041-11e5-8ef2-6466b305cde0', name: 'Продажа'}
            ]
        }
        const orders = lodash.compact(leads.Data.map((order) => {
            let day = order.ItemChanged.substring(0,2);
            let month = order.ItemChanged.substring(3,5);
            let rest = order.ItemChanged.substring(6);
            if ((new Date(params.date*1000) <= new Date(`${month}.${day}.${rest}`)) && (lodash.includes(statArr, order.StateEn))) {
                return {
                    id: order.ItemGUID,
                    name: order.FileAs,
                    date_create: order.ItemCreated,
                    status: order.StateEn,
                    price: order.Price,
                    cost: null,
                    roistat: Number.isInteger(+order.FileAs) ? order.FileAs : null,
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

    async createLead(params) {
        return await wrapper.saveEntity('Lead', params)
    }
}