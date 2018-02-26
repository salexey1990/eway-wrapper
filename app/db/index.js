const Sequelize = require('sequelize');
const config = require('../../config/db.json');
module.exports = sequelize = new Sequelize(
    config.database, config.username, config.password, config
)