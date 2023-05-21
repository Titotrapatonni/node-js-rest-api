const { HttpError } = require("../helpers");

const validateFavoriteBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing field favorite");
    }
    next();
  };
  return func;
};

module.exports = validateFavoriteBody;
