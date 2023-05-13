const { HttpError } = require("../helpers");

const checkEmptyBody = () => {
  const func = (req, res, next) => {
    const isEmptyBody = JSON.stringify(req.body) === "{}";
    if (isEmptyBody) {
      throw HttpError(400, "missing fields");
    }

    next();
  };
  return func;
};

module.exports = checkEmptyBody;
