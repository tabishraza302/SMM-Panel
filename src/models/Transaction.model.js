const { UUID, UUIDV4, DECIMAL, ENUM } = require("sequelize");

const User      = require("./User.model");
const Database  = require("../config/database.config");

const Transaction = Database.define("transactions", {
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
    amount: {
        type: DECIMAL,
        allowNull: false,
    },
    type: {
        type: ENUM("add_funds", "refund", "bonus"),
        allowNull: false
    },
    method: {
        type: ENUM("razorpay", "manual"),
        allowNull: false
    }
});

module.exports = Transaction;