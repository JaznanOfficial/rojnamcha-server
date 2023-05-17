const Blogs = require("../Models/blogs.model");

const getBlogsService = async (query) => {
    const result = await Blogs.find(query);
    console.log(result);
    return result;
};

const postBlogsService = async (data) => {
    const result = await Blogs.create(data);
    console.log(result);
    return result;
};

const deleteBlogsService = async (query) => {
    const result = await Blogs.deleteMany(query);
    console.log(result);
    return result;
};

const updateBlogsService = async (query, data) => {
    const result = await Blogs.findOneAndUpdate(query, data, { new: true });
    console.log(result);
    return result;
};

const likePostService = async (postId, email) => {
    const query = { _id: postId };
    const existingPost = await Blogs.findById(postId);

    if (existingPost.like_count.includes(email)) {
        // Remove the email from the array if it already exists
        const data = { $pull: { like_count: email } };
        return updateBlogsService(query, data);
    } else {
        // Push the email to the array if it doesn't exist
        const data = { $push: { like_count: email } };
        return updateBlogsService(query, data);
    }
};

module.exports = {
    getBlogsService,
    postBlogsService,
    deleteBlogsService,
    likePostService,
};
