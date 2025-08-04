const { query } = require("express-validator");
const MessageBuilder = require("../../utils/ValidationMessagesBuilder");

const OrderManagementValidator = {
    PageNumber: [
        query("page")
            .optional()
            .trim()
            .isNumeric()
            .withMessage(MessageBuilder.invalid("page number."))
    ]
};

module.exports = OrderManagementValidator;