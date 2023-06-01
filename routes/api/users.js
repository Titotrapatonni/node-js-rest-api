const express = require("express");
const ctrl = require("../../controllers/auth");
const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas");

const router = express.Router();

// signin
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

// signup
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

module.exports = router;
