import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  title: String,
  content: String,
  imageFile: String,
  creator: String,
  createdAt: {
    type: Date,
    default: new Date(),
  }
});

const BlogModal = mongoose.model("Blog", blogSchema);
export default BlogModal;