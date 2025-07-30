const User          = require("./User.model");
const Order         = require("./Order.model");
const Service       = require("./Service.model");
const Category      = require("./Category.model");
const Transaction   = require("./Transaction.model")

// User & Order
User.hasMany(Order, {foreignKey: "userId"});
Order.belongsTo(User, {foreignKey: "userId"});

// Order & Service
Service.hasMany(Order, {foreignKey: "serviceId"});
Order.belongsTo(Service, {foreignKey: "serviceId"});

// User & Transaction
User.hasMany(Transaction, {foreignKey: "userId"});
Transaction.belongsTo(User, {foreignKey: "userId"});

// Category & service 
Category.hasMany(Service, {foreignKey: "categoryId"});
Service.belongsTo(Category, {foreignKey: "categoryId"});