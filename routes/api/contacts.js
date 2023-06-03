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
  authenticate,
} = require("../../middlewares");

const schemas = require("../../schemas");

router.get("/", authenticate, getAll);

router.get("/:contactId", authenticate, isValidId, getById);

router.post("/", authenticate, validateBody(schemas.addSchema), add);

router.delete("/:contactId", authenticate, isValidId, deleteById);

router.put(
  "/:contactId",
  authenticate,
  checkEmptyBody(),
  isValidId,
  validateBody(schemas.addSchema),
  updateById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateFavoriteBody(schemas.updateFavoriteSchema),
  updateStatusContact
);

module.exports = router;
