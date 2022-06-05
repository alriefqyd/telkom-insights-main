const { Role, Feedback } = require("../models/index");

const getFeedback = (req, res) => {
    return Feedback.find({});
}

const getFeedbackById = (_id, res) => {
  return Feedback.findById(_id).exec();
}

module.exports = {
  getFeedback,
  getFeedbackById,
  createFeedback: async function (data) {
    const { ratings, note, bookings_id } = data;
    return await Feedback.create({ ratings, note, bookings_id });
  },
  updateFeedback: async function (_id, data) {
    const { ratings, note } = data;
    return await Feedback.findOneAndUpdate(
      { _id },
      { ratings, note },
      {
        new: true,
      }
    );
  },
}
//   createRole: async function (data) {
//     const { name, type } = data;
//     return await Role.create({ name, type });
//   },
//   softDeleteRole: async function (_id) {
//     return await Role.findOneAndUpdate({ _id }, { isActive: false });
//   },
