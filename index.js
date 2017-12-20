const axios = require('axios');
const md5 = require('md5');
class Wrapper {

    constructor(url, user, pswd, dieOnItemConflict = false) {
        this.url = url;
        this.username = user;
        this.passwordHash = md5(pswd);
        this.dieOnItemConflict = dieOnItemConflict;
        this.appVersion = 'PHP2.0';
    }

    async makeRequest(url, params = null) {
        if (!this.sessionId) {
            await this.login()
        }
        let reqParams = {}
        if (!params) {
            reqParams = {
                sessionId: this.sessionId
            }
        } else {
            reqParams = {
                sessionId: this.sessionId,
                transmitObject: params,
                dieOnItemConflict: this.dieOnItemConflict
            }
        }

        return axios.post(`${this.url}/${url}`, reqParams);
    }

    async login() {
        const login = {
            userName: this.username,
            passwordHash: this.passwordHash,
            appVersion: this.appVersion
        }
        const res = await axios.post(`${this.url}/Login`, login);
        this.sessionId = res.data.SessionId
        console.log(this.sessionId);
    }

    async getEntity(entity) {
        const res = await this.makeRequest(`Get${entity}`)
        console.log(res.data);
    }

    async SearchContacts(findParams) {
        await this.login();
        const res = await this.makeRequest(`${this.url}/SearchContacts`, findParams);
        console.log(res.data);
    }
}

const wrapper = new Wrapper('http://109.229.248.143/eway/WcfService/Service.svc/', 'krepkin', 'Repkin33');
// wrapper.SearchContacts({
// FirstName: 'евгений'
// });
wrapper.getEntity('Leads');
