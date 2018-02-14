const axios = require('axios');
const md5 = require('md5');
module.exports = class Wrapper {

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
        return res.data;
    }

    async searchEntity(entity, findParams) {
        const res = await this.makeRequest(`Search${entity}`, findParams);
        return res.data;
    }

    async saveEntity(entity, fields) {
        const res = await this.makeRequest(`Save${entity}`, fields);
        return res.data;
    }
}