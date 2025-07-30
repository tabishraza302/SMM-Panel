const { UUID, UUIDV4, STRING } = require("sequelize");

const Database = require("../config/database.config");

const Category = Database.define("categories", {
    id: {
        type: UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    name: {
        type: STRING,
        allowNull: false,
    },
});

module.exports = Category;