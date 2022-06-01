const roleService = require("../services/role.service");

module.exports = {
  getActiveRoles: async (req, res) => {
    try {
      const roles = await roleService.getActiveRoles();
      res.ok(roles, "Success to get all roles.");
    } catch (error) {
      console.log(error);
      res.failServerError(error.message);
    }
  },
  createRole: async (req, res) => {
    try {
      const roles = await roleService.createRole(req.body);
      res.respondCreated(roles, "Success to create a new role.");
    } catch (error) {
      console.log(error);
      res.failServerError(error.message);
    }
  },
  updateRole: async (req, res) => {
    try {
      const roles = await roleService.updateRole(req.params.id, req.body);
      res.respondUpdated(roles, "Success to update a new role.");
    } catch (error) {
      console.log(error);
      res.failServerError(error.message);
    }
  },
  softDeleteRole: async (req, res) => {
    try {
      await roleService.softDeleteRole(req.params.id);
      res.respondDeleted("Success to delete a role.");
    } catch (error) {
      console.log(error);
      res.failServerError(error.message);
    }
  },
};
