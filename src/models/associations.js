const User          = require("./User.model");
const Order         = require("./Order.model");
const Service       = require("./Service.model");
const Category      = require("./Category.model");
const Transaction   = require("./Transaction.model")

// User & Order
User.hasMany(Order, {as: "orders",  foreignKey: "userId"});
Order.belongsTo(User, {as :"user", foreignKey: "userId"});

// Order & Service
Service.hasMany(Order, {as: "orders", foreignKey: "serviceId"});
Order.belongsTo(Service, {as: "service", foreignKey: "serviceId"});

// User & Transaction
User.hasMany(Transaction, {as: "transactions", foreignKey: "userId"});
Transaction.belongsTo(User, {as: "user", foreignKey: "userId"});

// Category & service 
Category.hasMany(Service, {as: "services", foreignKey: "categoryId"});
Service.belongsTo(Category, {as: "category", foreignKey: "categoryId"});