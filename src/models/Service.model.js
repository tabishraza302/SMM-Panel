const { UUID, UUIDV4, STRING, TEXT, DECIMAL, INTEGER } = require("sequelize");

const Category = require("./Category.model");
const Database = require("../config/database.config"); 

const Service = Database.define("services", {
    id: {
        type: UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    categoryId: {
        type: UUID,
        references: {
            model: Category,
            key: "id"
        }
    },
    name: {
        type: STRING,
        allowNull: false,
    },
    description: {
        type: TEXT,
        allowNull: false
    },
    price: {
        type: DECIMAL, 
        allowNull: false
    },
    min_quantity: {
        type: INTEGER,
        allowNull: false
    },
    max_quantity: {
        type: INTEGER,
        allowNull: false
    }
});

module.exports = Service;