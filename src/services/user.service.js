const { User } = require("../models");

const getUser = (req, res) => {
  return User.find().exec();
}

module.exports = {
  find: async (_id) => {
    return await User.findOne({ _id });
  },
  getUser,
  createUser: async function (data) {
    const { email, password, name, role, isEmailVerified } = data;
    return await User.create({ email, password, name, role, isEmailVerified });
  },
  updateUser: async function (_id, data) {
    const { email, password, name, role, isEmailVerified } = data;
    return await User.findOneAndUpdate(
      { _id },
      { email, password, name, role },
      {
        new: true,
      }
    );
  },
  deleteUser: async function (_id) {
    return await User.remove({ _id})
  },

};
