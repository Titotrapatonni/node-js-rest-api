const { addSchema } = require("./contacts");
const { updateFavoriteSchema } = require("./contacts");
const { registerSchema, loginSchema } = require("./users");

const schemas = {
  addSchema,
  updateFavoriteSchema,
  registerSchema,
  loginSchema,
};

module.exports = schemas;
