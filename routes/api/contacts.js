const express = require("express");

const router = express.Router();

const {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
  updateStatusContact,
} = require("../../controllers/contacts");

const {
  validateBody,
  validateFavoriteBody,
  checkEmptyBody,
  isValidId,
} = require("../../middlewares");

const schemas = require("../../schemas");

router.get("/", getAll);

router.get("/:contactId", isValidId, getById);

router.post("/", validateBody(schemas.addSchema), add);

router.delete("/:contactId", isValidId, deleteById);

router.put(
  "/:contactId",
  checkEmptyBody(),
  isValidId,
  validateBody(schemas.addSchema),
  updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateFavoriteBody(schemas.updateFavoriteSchema),
  updateStatusContact
);

module.exports = router;
