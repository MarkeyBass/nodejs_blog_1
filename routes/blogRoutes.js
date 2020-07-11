//     '/blog' router

const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();



// BLOG ROUTS
router.get('/', blogController.blog_index);

router.get('/create', blogController.blog_create_get);

router.get('/:id', blogController.blog_details);

router.post('/', blogController.blog_create_post);

router.delete('/:id', blogController.blog_delete);

module.exports = router;