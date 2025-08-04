const { UUID, UUIDV4, STRING, ENUM, BOOLEAN, INTEGER } = require("sequelize");

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
    status: {
        type: ENUM("active", "disabled"),
        allowNull: false,
        defaultValue: "active"
    },
    position: {
        type: INTEGER,
        allowNull: false,
    },
    deleted: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

module.exports = Category;