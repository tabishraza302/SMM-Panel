const { query, body, param } = require("express-validator");
const MessageBuilder = require("../../utils/ValidationMessagesBuilder");

const CategoriesManagementValidator = {
    // Validate optional page number in query parameters
    PageNumber: [
        query("page")
            .optional()
            .trim()
            .isNumeric()
            .withMessage(MessageBuilder.invalid("page number")),
    ],

    // Validate request body for adding a new category
    AddCategory: [
        body("name")
            .trim()
            .isString()
            .matches(/^[a-zA-Z0-9 ]+$/)
            .withMessage(MessageBuilder.onlyAlphaNumSpace("Name")),

        body("position")
            .trim()
            .isNumeric()
            .withMessage(MessageBuilder.invalid("position"))
            .custom((value) => value > 0)
            .withMessage(MessageBuilder.mustBeGreaterThan("Position", 0)),

        body("status")
            .trim()
            .custom((value) => value === "active" || value === "disabled")
            .withMessage(MessageBuilder.mustBeOneOf("Status", ["active", "disabled"])),
    ],

    // Validate request body for editing an existing category
    EditCategory: [
        body("id")
            .trim()
            .isUUID()
            .withMessage(MessageBuilder.malformedUUID("Category ID")),

        body("name")
            .trim()
            .isString()
            .matches(/^[a-zA-Z0-9 ]+$/)
            .withMessage(MessageBuilder.onlyAlphaNumSpace("Name")),

        body("position")
            .trim()
            .isNumeric()
            .withMessage(MessageBuilder.invalid("position"))
            .custom((value) => value > 0)
            .withMessage(MessageBuilder.mustBeGreaterThan("Position", 0)),

        body("status")
            .trim()
            .custom((value) => value === "active" || value === "disabled")
            .withMessage(MessageBuilder.mustBeOneOf("Status", ["active", "disabled"])),
    ],

    // Validate UUID param for category deletion
    DeleteCategory: [
        param("id")
            .trim()
            .isUUID()
            .withMessage(MessageBuilder.malformedUUID("Category ID")),
    ],
};  

module.exports = CategoriesManagementValidator;
