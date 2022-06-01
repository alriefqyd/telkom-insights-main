const { Role } = require("../models/index");

module.exports = {
  getActiveRoles: async function (req, res) {
    return await Role.find({ isActive: true });
  },
  createRole: async function (data) {
    const { name, type } = data;
    return await Role.create({ name, type });
  },
  updateRole: async function (_id, data) {
    const { name, type } = data;
    return await Role.findOneAndUpdate(
      { _id },
      { name, type },
      {
        new: true,
      }
    );
  },
  softDeleteRole: async function (_id) {
    return await Role.findOneAndUpdate({ _id }, { isActive: false });
  },
};
