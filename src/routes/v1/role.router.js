const router = require("express").Router();
const roleController = require("../../controllers/role.controller");
const validator = require("../../utils/validator");

router.get("/", roleController.getActiveRoles);

router.post(
  "/",
  validator.nameValidator,
  validator.roleTypeValidator,
  validator.result,
  roleController.createRole
);

router.put(
  "/:id",
  validator.idValidator,
  validator.nameValidator,
  validator.roleTypeValidator,
  validator.result,
  roleController.updateRole
);

router.delete(
  "/:id",
  validator.idValidator,
  validator.result,
  roleController.softDeleteRole
);

module.exports = router;
