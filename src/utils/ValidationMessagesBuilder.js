// src/utils/validationMessageBuilder.js
module.exports = {
  required: (field) => `${field} is required.`,
  invalid: (field) => `Enter a valid ${field}.`,
  mustBeAlpha: (field) => `${field} must contain letters only.`,
  mustBeGreaterThan: (field, num) => `${field} should be greater than ${num}.`,
  mustBeNumeric: (field) => `${field} must be a number.`,
  mustBeUUID: (field) => `${field} must be a valid UUID.`,
  mustBeOneOf: (field, values) => `${field} must be one of: ${values.join(", ")}.`,
  malformedUUID: (field) => `${field} is malformed.`,
  minLength: (field, length) => `${field} must be at least ${length} characters long.`,
  match: (field1, field2) => `${field1} must match ${field2}.`,
  onlyAlphaNumSpace: (field) => `${field} can contain letters, numbers, and spaces only.`,
};
