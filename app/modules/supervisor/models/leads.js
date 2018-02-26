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
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    resource: {
        type: Sequelize.STRING,
        allowNull: false
    },
    comment: {
        type: Sequelize.STRING,
        allowNull: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true
    },
    promo: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
}, {
    tableName: 'leads',
    timestamps: false
});
