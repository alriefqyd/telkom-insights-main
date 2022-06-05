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
  getFeedbackById: async (req, res) => {
    try {
      const feedbacks = await feedbackService.getFeedbackById(req.params.id);
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
  updateFeedback: async (req, res) => {
    try {
      const roles = await feedbackService.updateFeedback(req.params.id, req.body);
      res.respondUpdated(roles, "Success to update a feedback.");
    } catch (error) {
      console.log(error);
      res.failServerError(error.message);
    }
  },
  deleteFeedback: async (req, res) => {
    try {
      await feedbackService.deleteFeedback(req.params.id);
      res.respondDeleted("Success to delete a role.");
    } catch (error) {
      console.log(error);
      res.failServerError(error.message);
    }
  },
};
