const { Sequelize } = require("sequelize");

const DB_NAME = process.env.DB_NAME; // Database name
const DB_USER = process.env.DB_USER; // Database username
const DB_PASS = process.env.DB_PASS; // Database password

const database = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: "localhost",
    dialect: "mysql"
});

module.exports = database;