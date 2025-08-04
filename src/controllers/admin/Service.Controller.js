const SuccessResponse               = require("../../utils/successResponse");
const StatusCodes                   = require("../../constants//http/StatusCodes");
const ServicesManagementServices    = require("../../services/admin//ServicesManagement.service");

class ServiceController {
    constructor() {
        this.ServicesManagementServices = new ServicesManagementServices();

        this.GetAddServiceData = this.GetAddServiceData.bind(this);
    }

    async GetAddServiceData(req, res, next) {
        try {
            const categories = await this.ServicesManagementServices.GetAddServiceData();
            SuccessResponse(res, StatusCodes.OK, "", categories);
        }catch(error) {
            next(error);
        }
    }
}

module.exports = new ServiceController();