const Sequelize = require('sequelize');

const sequelize = require('../../../db');

module.exports = Managers =
    sequelize.define('managers', {

    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    crm_id: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'managers',
    timestamps: false
});
