const { addSchema } = require("./contacts");
const { updateFavoriteSchema } = require("./contacts");
const {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
} = require("./users");

const schemas = {
  addSchema,
  updateFavoriteSchema,
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
};

module.exports = schemas;
