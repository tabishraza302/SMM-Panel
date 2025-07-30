const { UUID, UUIDV4, INTEGER, STRING, ENUM, DECIMAL } = require("sequelize");

const User      = require("./User.model");
const Service   = require("./Service.model");
const Database  = require("../config/database.config");

const Order = Database.define("orders", {
    id: {
        type: UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    userId: {
        type: UUID,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    },
    serviceId: {
        type: UUID,
        allowNull: false,
        references: {
            model: Service,
            key: "id"
        }
    },
    quantity: {
        type: INTEGER,
        allowNull: false
    },
    link: {
        type: STRING,
        allowNull: false
    },
    status: {
        type: ENUM("pending", "processing", "completed", "failed", "refunded", "partial"),
        allowNull: false,
        defaultValue: "pending"
    },
    charge: {
        type: DECIMAL,
        allowNull: false,
    },
    apiOrderId: {
        type: STRING,
        allowNull: true
    }
});

module.exports = Order;