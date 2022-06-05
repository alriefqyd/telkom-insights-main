const router = require("express").Router();

const controller = require('../../controllers/feedback.controller');


router.get('/', controller.getFeedback);
router.get('/:id', controller.getFeedbackById);
router.post('/', controller.createFeedback);
router.put('/:id',controller.updateFeedback)
router.delete('/:id',controller.deleteFeedback);
module.exports = router;