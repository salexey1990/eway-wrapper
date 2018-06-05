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
        let resource;
        if (params.title.indexOf('Звонок') != -1) {
            resource = '8800'
        } else if (params.title.indexOf('Пойманный лид') != -1) {
            resource = 'Leadhunt'
        } else if (params.data && JSON.parse(params.data).marker == 'УТП') {
            resource = 'First'
        } else if (params.data && JSON.parse(params.data).marker == 'Заказать звонок') {
            resource = 'Recall'
        } else if (params.data && JSON.parse(params.data).marker && JSON.parse(params.data).marker.indexOf('Карточка товара, кнопка купить') != -1) {
            resource = 'Product'
        } else if (params.data && JSON.parse(params.data).marker == 'Главная страница, форма захвата по email') {
            resource = 'Getemail'
        } else if (params.data && JSON.parse(params.data).marker == 'Главная страница, география поставки') {
            resource = 'Dist'
        } else if (params.data && JSON.parse(params.data).marker && JSON.parse(params.data).marker.indexOf('Карточка товара, форма') != -1) {
            resource = 'Help'
        }  else if (params.data && JSON.parse(params.data).marker == 'Каталог') {
            resource = 'Help'
        } else if (params.data && JSON.parse(params.data).marker && JSON.parse(params.data).marker.indexOf('Выполняемы работы, форма') != -1) {
            resource = 'Inst'
        } else if (params.data && JSON.parse(params.data).marker == 'Контакты') {
            resource = 'Contacts'
        } else {
            resource = 'Email'
        }
        const newLead = {
            date: params.created_date,
            title: params.title || 'не известен',
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