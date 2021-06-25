const express = require('express');
const { check } = require('express-validator');

const postController = require('../controllers/posts-controller');
const fileUpload = require('../middleware/file-upload');

const router = express.Router();

router.get('/:pid', postController.getPostById);

router.get('/user/:uid', postController.getPostsByUserId);

router.post(
  '/',
  fileUpload.single('image'),
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address')
      .not()
      .isEmpty()
  ],
  postController.createPost
);

router.patch(
  '/:pid',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 })
  ],
  postController.updatePost
);

router.delete('/:pid', postController.deletePost);

module.exports = router;
