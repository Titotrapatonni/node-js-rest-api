const { addSchema, updateFavoriteSchema } = require("./contacts");
const {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
  emailSchema,
} = require("./users");

const schemas = {
  addSchema,
  updateFavoriteSchema,
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
  emailSchema,
};

module.exports = schemas;
