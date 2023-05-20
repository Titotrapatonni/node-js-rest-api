const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const fieldNameError = error.details[0].path[0];
      throw HttpError(400, `missing required ${fieldNameError} field`);
    }
    next();
  };
  return func;
};

module.exports = validateBody;
