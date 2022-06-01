const { Role, Feedback } = require("../models/index");

const getFeedback = (req, res) => {
    return Feedback.find({});
}

module.exports = {
  getFeedback,
  createFeedback: async function (data) {
    const { ratings, note } = data;
    return await Feedback.create({ ratings, note });
  },
}
//   createRole: async function (data) {
//     const { name, type } = data;
//     return await Role.create({ name, type });
//   },
//   updateRole: async function (_id, data) {
//     const { name, type } = data;
//     return await Role.findOneAndUpdate(
//       { _id },
//       { name, type },
//       {
//         new: true,
//       }
//     );
//   },
//   softDeleteRole: async function (_id) {
//     return await Role.findOneAndUpdate({ _id }, { isActive: false });
//   },
