import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import {
  createBlog,
  getBlogs,
  getBlog,
  getBlogsByUser,
  deleteBlog,


} from "../controllers/blog.js";

router.post("/", auth, createBlog);
router.get("/", getBlogs);
router.get("/:id", getBlog);
router.get("/userBlogs/:id", auth, getBlogsByUser);
router.delete("/:id", auth, deleteBlog);


export default router;