const SuccessResponse               = require("../../utils/successResponse");
const StatusCodes                   = require("../../constants/http/StatusCodes");
const SuccessMessages               = require("../../constants/messages/SuccessMessages");
const CategoriesManagementServices  = require("../../services/admin/CategoriesManagement.Service");

class CategoriesController {
    constructor() {
        this.CategoriesManagementServices   = new CategoriesManagementServices();

        this.AddCategory        = this.AddCategory.bind(this);
        this.EditCategory       = this.EditCategory.bind(this);
        this.GetCategories      = this.GetCategories.bind(this);
        this.DeleteCategory     = this.DeleteCategory.bind(this);
    }

    // Handles fetch request for categories page
    async GetCategories(req, res, next) {
        try {
            const categoriesList = await this.CategoriesManagementServices.GetCategories(req.query.page || 1);
            SuccessResponse(res, StatusCodes.OK, "", categoriesList);
        } catch(error) {
            next(error);
        }
    }

    // Handle request to add new category
    async AddCategory(req, res, next) {
        try {
            await this.CategoriesManagementServices.AddCategory(req.body);
            SuccessResponse(res, StatusCodes.CREATED, SuccessMessages.CATEGORY.CREATED);
        }catch(error) {
            next(error);
        }
    }

    // Handles request to edit/update category.
    async EditCategory(req, res, next) {
        try {
            await this.CategoriesManagementServices.EditCategory(req.body);
            SuccessResponse(res, StatusCodes.OK, SuccessMessages.CATEGORY.UPDATED);
        } catch(error) {
            next(error);
        }
    }

    // Handles request to delete category.
    async DeleteCategory(req, res, next) {
        try {
            await this.CategoriesManagementServices.DeleteCategory(req.params.id);
            SuccessResponse(res, StatusCodes.OK, SuccessMessages.CATEGORY.DELETED);
        }catch(error) {
            next(error);
        }
    }
}

module.exports = new CategoriesController();