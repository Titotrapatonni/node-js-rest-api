const express = require("express");

const router = express.Router();

const {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
} = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas");

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", validateBody(schemas.addSchema), add);

router.delete("/:contactId", deleteById);

router.put("/:contactId", validateBody(schemas.addSchema), updateById);

module.exports = router;
