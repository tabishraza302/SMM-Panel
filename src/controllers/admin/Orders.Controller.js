const SuccessResponse           = require("../../utils/successResponse");
const StatusCodes               = require("../../constants/http/StatusCodes");
const OrderManagementService    = require("../../services/admin/OrdersManagement.Service");

class OrdersController {
    constructor() {
        this.OrderManagementServices = new OrderManagementService();

        this.GetOrders = this.GetOrders.bind(this);
    }

    // Handles get request for orders page
    async GetOrders(req, res, next) {
        try {
            const ordersList = await this.OrderManagementServices.GetOrders(req.query.page || 1);
            SuccessResponse(res, StatusCodes.OK, "", ordersList);
        } catch(error) {
            next(error);
        }
    }
}

module.exports = new OrdersController();