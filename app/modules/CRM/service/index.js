const Wrapper = require('../components/eway');
const config = require('../../../../config');
const wrapper = new Wrapper(config.eWayURL, config.eWayUser, config.eWayPswd);

module.exports = class ServiceEW {
    async getLeads(params) {
        const leads = await wrapper.getEntity('Leads');
        return leads;
    }
}