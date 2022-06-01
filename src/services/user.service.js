const { User } = require("../models");

module.exports = {
  find: async (_id) => {
    return await User.findOne({ _id });
  },
};
