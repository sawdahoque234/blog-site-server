import BlogModal from "../models/blog.js";
import mongoose from "mongoose";

export const createBlog = async (req, res) => {
  const blog = req.body;
  const newBlog = new BlogModal({
    ...blog,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
//get all blogs

export const getBlogs = async (req, res) => {
  const { page } = req.query;
  try {
    const limit = 4;
    const startIndex = (Number(page) - 1) * limit;
    const total = await BlogModal.countDocuments({});
    const blogs = await BlogModal.find().limit(limit).skip(startIndex);
    res.json({
      blogs,
      currentPage: Number(page),
      totalBlogs: total,
      numberOfPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
// get single blog
export const getBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await BlogModal.findById(id);
    res.status(200).json(blog);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

// get user blog
export const getBlogsByUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User doesn't exist" });
  }
  const userBlogs = await BlogModal.find({ creator: id });
  res.status(200).json(userBlogs);
};
//deleteblog

export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No Blog exist with id: ${id}` });
    }
    await BlogModal.findByIdAndRemove(id);
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
  
};

