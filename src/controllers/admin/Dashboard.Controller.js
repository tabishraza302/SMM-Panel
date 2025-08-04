const SuccessResponse   = require("../../utils/successResponse");
const StatusCodes       = require("../../constants/http/StatusCodes");
const DashboardServices = require("../../services/admin/Dashboard.Service");

class DashboardController {
    constructor() {
        this.DashboardServices = new DashboardServices();

        this.GetDashboard = this.GetDashboard.bind(this);
    }

    // Handle get request for dashboard page
    async GetDashboard(req, res, next) {
        try {
            const dashboardData = await this.DashboardServices.GetDashboard();
            return SuccessResponse(res, StatusCodes.OK, "", dashboardData);
        } catch(error) {
            next(error);
        }
    }
}

module.exports = new DashboardController();