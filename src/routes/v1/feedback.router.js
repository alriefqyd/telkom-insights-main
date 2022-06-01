const router = require("express").Router();

const controller = require('../../controllers/feedback.controller');


router.get('/', controller.getFeedback);
// router.get('/:id', controller.getFeedbackById);
router.post('/', controller.createFeedback);

module.exports = router;