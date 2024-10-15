const express = require('express');
const blogCommentController = require('../controllers/blogCommentController');

const router = express.Router();

router.post('/add', blogCommentController.add);
router.get('/', blogCommentController.get);
router.get('/:id', blogCommentController.getSingle);
router.get('/user/:userId', blogCommentController.getByUser);
router.put('/:id', blogCommentController.update);
router.delete('/:id', blogCommentController.destroy);

module.exports = router;