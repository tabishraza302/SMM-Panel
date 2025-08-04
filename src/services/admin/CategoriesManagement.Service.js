const Paginate      = require("../../utils/paginate");
const CustomError   = require("../../utils/CustomError");
const Category      = require("../../models/Category.model");
const StatusCodes   = require("../../constants/http/StatusCodes");
const StatusTypes   = require("../../constants/enums/StatusTypes");
const ErrorMessages = require("../../constants/messages/ErrorMessages");

class CategoriesManagementServices  {
    /**
     * Fetches all the categories for a single page.
     * (Single page can display update 20 category).
     * Calls Paginate function to fetch list of categories required.
     */
    async GetCategories(page) {
        try {
            const categoriesList = await Paginate(Category, {
                page,
                pageSize: 20,
                where: { deleted: false },
                order: [["position", "ASC"]],
                attributes: ["name", "position", "status"]
            });

            return categoriesList;            
        }catch(error) {
            throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, ErrorMessages.CATEGORY.FETCH_FAILED);
        }
    }

    /**
     * Takes details of new category and create a database record.
     */
    async AddCategory(categoryDetails) {
        const { name, position, status } = categoryDetails;

        try {
            await Category.create({ name, position, status });
            return true;
        } catch(error) {
            throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, ErrorMessages.CATEGORY.CREATION_FAILED);
        }
    }

    /**
     * Takes updated details of category from user
     * and update those details in database using category id.
     * But before updating details it checks if category exist
     * and the status is active and have not been deleted. 
     */
    async EditCategory(updatedDetails) {
        const {id, name, position, status} = updatedDetails;

        const categoryExist = await Category.findOne({ where: { id, status: StatusTypes.ACTIVE, deleted: false }});
        if(!categoryExist) throw new CustomError(StatusCodes.BAD_REQUEST, ErrorMessages.CATEGORY.NOT_EXIST);

        try {
            await Category.update({ name, position, status }, { where: { id }});
        } catch(error) {
            throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, ErrorMessages.CATEGORY.UPDATE_FAILED);
        }
    }

    /**
     * Handle deletion process of category.
     * 1. Check if teh category exist and their status is active
     *    also it has not been marked  as deleted.
     * 2. If category doesn't exit throws an error
     * 3. If category does exist. Update its deleted status to true.
     */
    async DeleteCategory(id) {
        const existCategory = await Category.findOne({where: {id, status: StatusTypes.ACTIVE, deleted: false}});
        if(!existCategory) throw new CustomError(StatusCodes.BAD_REQUEST, ErrorMessages.CATEGORY.NOT_EXIST);

        try {
            await Category.update({deleted: true, status: StatusTypes.DISABLED}, { where: {id} });
            return true;
        } catch(error) {
            throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, ErrorMessages.CATEGORY.DELETE_FAILED);
        }
    }
}

module.exports = CategoriesManagementServices;