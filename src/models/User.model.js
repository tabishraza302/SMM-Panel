const { UUID, UUIDV4, STRING, INTEGER, ENUM, BOOLEAN } = require("sequelize");

const Database = require("../config/database.config");

const User = Database.define("user", {
    id: {
        type: UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    first_name: {
        type: STRING,
        allowNull: false
    },
    last_name: {
        type: STRING,
        allowNull: false,
    },
    email: {
        type: STRING,
        unique: true,
        allowNull: false
    },
    passwordHash: {
        type: STRING,
        allowNull: false
    },
    balance: {
        type: INTEGER,
        defaultValue: 0
    },
    role: {
        type: ENUM("user", "admin"),
        defaultValue: "user"
    },
    isActive: {
        type: BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
});

module.exports = User;