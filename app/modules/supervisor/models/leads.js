const Sequelize = require('sequelize');

const sequelize = require('../../../db');

module.exports = Leads =
    sequelize.define('leads', {

    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'leads',
    timestamps: false
});
