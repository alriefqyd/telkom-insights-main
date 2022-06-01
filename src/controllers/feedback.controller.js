const feedbackService = require("../services/feedback.service");

module.exports = {
  getFeedback: async (req, res) => {
    try {
      const feedbacks = await feedbackService.getFeedback();
      res.ok(feedbacks, "Success to get all feedback.");
    } catch (error) {
      console.log(error);
      res.failServerError(error.message);
    }
  },
  createFeedback: async (req, res) => {
    try {
      const feedbacks = await feedbackService.createFeedback(req.body);
      res.respondCreated(feedbacks, "Success to create a new feedback.");
    } catch (error) {
      console.log(error);
      res.failServerError(error.message);
    }
  },
//   updateRole: async (req, res) => {
//     try {
//       const roles = await roleService.updateRole(req.params.id, req.body);
//       res.respondUpdated(roles, "Success to update a new role.");
//     } catch (error) {
//       console.log(error);
//       res.failServerError(error.message);
//     }
//   },
//   softDeleteRole: async (req, res) => {
//     try {
//       await roleService.softDeleteRole(req.params.id);
//       res.respondDeleted("Success to delete a role.");
//     } catch (error) {
//       console.log(error);
//       res.failServerError(error.message);
//     }
//   },
};
