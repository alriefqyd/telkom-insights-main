const userService = require("../services/user.service");

module.exports = {
  getUser: async (req, res) => {
    try {
      const user = await userService.getUser();
      res.ok(user, "Success to get all user.");
    } catch (error) {
      console.log(error);
      res.failServerError(error.message);
    }
  },
  getUserById: async (req, res) => {
    try {
      const feedbacks = await userService.getUserById(req.params.id);
      res.ok(feedbacks, "Success to get user.");
    } catch (error) {
      console.log(error);
      res.failServerError(error.message);
    }
  },
  createUser: async (req, res) => {
    try {
      const feedbacks = await userService.createUser(req.body);
      res.respondCreated(feedbacks, "Success to create a new user.");
    } catch (error) {
      console.log(error);
      res.failServerError(error.message);
    }
  },
  updateUser: async (req, res) => {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.respondUpdated(user, "Success to update a user.");
    } catch (error) {
      console.log(error);
      res.failServerError(error.message);
    }
  },
  deleteUser: async (req, res) => {
    try {
      await userService.deleteUser(req.params.id);
      res.respondDeleted("Success to delete a user.");
    } catch (error) {
      console.log(error);
      res.failServerError(error.message);
    }
  },
};
