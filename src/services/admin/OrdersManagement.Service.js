const Paginate  = require("../../utils/paginate");
const User      = require("../../models/User.model");
const Order     = require("../../models/Order.model");
const Service   = require("../../models/Service.model");

class OrderManagementServices {    
    async GetOrders(currentPage) {
        const ordersList = await Paginate(Order, { 
            page: currentPage,
            pageSize: 20,
            where: {},
            order: [["createdAt", "DESC"]],
            attributes: ["quantity", "link", "status", "charge", "apiOrderId"],
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["email"]
                },
                {
                    model: Service,
                    as: "service",
                    attributes: ["name"]
                }
            ]
        });


        const orders = [];
        ordersList.forEach((order, index) => {
            orders[index] = {
                email: order.user.email,
                service: order.service.name,
                quantity: order.quantity,
                link: order.link,
                status: order.status,
                charge: order.charge, 
                apiOrderId: order.apiOrderId 
            }
        });
        
        return orders;
    }
}

module.exports = OrderManagementServices;