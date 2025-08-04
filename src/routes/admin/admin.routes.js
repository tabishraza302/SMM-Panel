const express = require("express");
const router  = express.Router();

const OrderController       = require("../../controllers/admin/Orders.Controller");
const ServiceController     = require("../../controllers/admin/Service.Controller");
const DashboardController   = require("../../controllers/admin/Dashboard.Controller");
const CategoriesController  = require("../../controllers/admin/Categories.Controller");

const IsAdmin                       = require("../../middlewares/IsAdmin.middleware");
const OrderManagementValidator      = require("../../validators/admin/orderManagement.validator");
const CheckValidationResult         = require("../../middlewares/CheckValidationResult.middleware");
const CategoriesManagementValidator = require("../../validators/admin/categoriesManagement.validator");

// Dashboard route
router.get("/dashboard", IsAdmin, DashboardController.GetDashboard);

// Order Management Routes
router.get("/orders", IsAdmin, OrderManagementValidator.PageNumber, CheckValidationResult, OrderController.GetOrders);

// Services management routes
router.get("/services/add-data", IsAdmin, ServiceController.GetAddServiceData)


// Categories management routes
router.get("/categories", IsAdmin, CategoriesManagementValidator.PageNumber, CheckValidationResult, CategoriesController.GetCategories);
router.post("/category/add", IsAdmin, CategoriesManagementValidator.AddCategory, CheckValidationResult, CategoriesController.AddCategory);
router.put("/category/edit", IsAdmin, CategoriesManagementValidator.EditCategory, CheckValidationResult, CategoriesController.EditCategory);
router.delete("/category/delete/:id", IsAdmin, CategoriesManagementValidator.DeleteCategory, CheckValidationResult, CategoriesController.DeleteCategory);

module.exports = router;