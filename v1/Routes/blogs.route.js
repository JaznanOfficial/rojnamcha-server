const express = require("express");
const {
    getBlogsController,
    postBlogsController,
    deleteBlogsController,
    updateBlogsController,
    likePostController,
    unlikePostController,
} = require("../Controllers/blogs.controller");

const router = express.Router();

router
    .route("/")
    .get(getBlogsController)
    .post(postBlogsController)
    .delete(deleteBlogsController)
    .patch(updateBlogsController);

router.route("/:id").patch(likePostController);
// router.patch("/:postId", unlikePostController);

module.exports = router;
