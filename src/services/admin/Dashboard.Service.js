const User      = require("../../models/User.model");
const Order     = require("../../models/Order.model");
const Service   = require("../../models/Service.model");

class DashboardServices {
    /**
    * Fetches details to be shown on dashboard.
    * Arrange those details and returns the ordered details.
    */
    async GetDashboard() {
        const totalUser = await User.count();
        const totalOrder = await Order.count();


        const last5Orders = await Order.findAll({ 
            limit: 5,
            order: [["createdAt","DESC"]],
            attributes: ["status", "createdAt"],
            include: [
                {
                    model: Service,
                    as: "service",
                    attributes: ["name"]
                },
                {
                    model: User,
                    as: "user",
                    attributes: ["email"]
                }
            ]
        });


        const recentOrders = [];
        last5Orders.forEach((order, index) => {
            recentOrders[index] = {
                serviceName: order.service.name,
                userEmail: order.user.email,
                orderStatus: order.status,
                orderTime: new Date(order.createdAt)
            }
        });
    
        return {
            totalUser,
            totalOrder,
            recentOrders
        }
    }
}

module.exports = DashboardServices;