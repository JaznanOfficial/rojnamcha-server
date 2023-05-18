const express = require("express");
const {
    getBlogsService,
    postBlogsService,
    deleteBlogsService,
    updateBlogsService,
    likePostService,
    unlikePostService,
} = require("../Services/blogs.service");

const getBlogsController = async (req, res) => {
    try {
        const query = req.query;
        const blogs = await getBlogsService(query);
        console.log(blogs);
        if (blogs.length === 0) {
            return res.status(200).json({
                message:
                    "You have no data or entered wrong queries. Please insert data first or check your queries.",
            });
        }
        return res.status(200).json(blogs);
    } catch (error) {
        res.json(error.message);
    }
};

const postBlogsController = async (req, res) => {
    try {
        const data = req.body;
        const blogs = await postBlogsService(data);
        console.log(blogs);
        res.status(200).json({
            status: "Successful",
            message: "Data added successfully",
        });
    } catch (error) {
        res.json(error);
    }
};

const deleteBlogsController = async (req, res) => {
    try {
        const query = req.query;
        const blogs = await deleteBlogsService(query);
        console.log(blogs);
        if (blogs.acknowledged && !blogs.deletedCount) {
            return res.status(404).json({
                status: "Failed",
                message: "We didn't find any blog to delete.",
            });
        } else if (blogs.acknowledged && blogs.deletedCount) {
            return res.status(200).json({
                status: "Successful",
                message: "Data deleted successfully",
            });
        }
        return res.status(500).json({
            status: "Failed",
            message: "Something went wrong! Please try again or contact us.",
        });
    } catch (error) {
        res.json(error);
    }
};

const updateBlogsController = async (req, res) => {
    try {
        const query = req.query;
        const data = req.body;
        const blogs = await updateBlogsService(query, data);
        console.log(blogs);
        if (blogs.acknowledged && !blogs.matchedCount) {
            return res.status(404).json({
                status: "Failed",
                message: "We didn't find any blog to update.",
            });
        } else if (blogs.matchedCount && blogs.modifiedCount) {
            return res.status(200).json({
                status: "Successful",
                message: "Data updated successfully",
            });
        }
        return res.status(500).json({
            status: "Failed",
            message: "Something went wrong! Please try again or contact us.",
        });
    } catch (error) {
        res.json(error);
    }
};

const likePostController = async (req, res) => {
    try {
        const { id } = req.params;
        const {email} = req.body
        // console.log(req.body)
        const updatedPost = await likePostService(id,email);
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Something went wrong! Please try again or contact us.",
        });
    }
};



module.exports = {
    getBlogsController,
    postBlogsController,
    deleteBlogsController,
    updateBlogsController,
    likePostController,
    
};
