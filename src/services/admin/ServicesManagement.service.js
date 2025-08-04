const CustomError   = require("../../utils/CustomError");
const Category      = require("../../models/Category.model");
const StatusCodes    = require("../../constants/http/StatusCodes");
const ErrorMessages  = require("../../constants/messages/ErrorMessages");

class ServicesManagementServices {
    async GetAddServiceData() {
        try {
            const categories = await Category.findAll({ where: { status: "active", deleted: false }});
            return categories;
        }catch(error) {
            throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, ErrorMessages.SYSTEM.DATA_FETCH_FAILED);
        }
    }
}

module.exports = ServicesManagementServices;