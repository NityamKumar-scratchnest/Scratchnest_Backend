import Blog from "../models/Blog.js";
import slugify from "slugify";

const authorSelect = "_id name email role";

export const createBlog = async (req, res) => {
  try {
    const { title, excerpt, content, tags, featuredImage, published } = req.body;
    const authorId = req.user;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content required" });
    }

    const slugBase = slugify(title, { lower: true, strict: true });
    let slug = slugBase;
    if (await Blog.findOne({ slug })) slug = `${slugBase}-${Date.now()}`;

    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      author: authorId,
      tags: tags || [],
      featuredImage,
      published: published ?? true,
      deleted: false
    });

    const populated = await blog.populate("author", authorSelect);
    res.json({ message: "Blog created", blog: populated });

  } catch (err) {
    res.status(500).json({ message: "Create blog failed", error: err.message });
  }
};

export const listBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ deleted: false, published: true })
      .sort({ createdAt: -1 })
      .populate("author", authorSelect);

    res.json(blogs);

  } catch (err) {
    res.status(500).json({ message: "List blogs failed", error: err.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      _id: req.params.id,
      deleted: false
    }).populate("author", authorSelect);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json(blog);

  } catch (err) {
    res.status(500).json({ message: "Get blog failed", error: err.message });
  }
};

export const getBlogsByAuthor = async (req, res) => {
  try {
    const blogs = await Blog.find({
      author: req.params.authorId,
      deleted: false,
      published: true
    })
      .sort({ createdAt: -1 })
      .populate("author", authorSelect);

    res.json(blogs);

  } catch (err) {
    res.status(500).json({ message: "Get by author failed", error: err.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.author.toString() !== req.user.toString()) {
      return res.status(403).json({ message: "Only author can update this blog" });
    }

    const updates = req.body;

    if (updates.title) {
      updates.slug = slugify(updates.title, { lower: true, strict: true }) + `-${Date.now()}`;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updates, {
      new: true
    }).populate("author", authorSelect);

    res.json({ message: "Blog updated", blog: updatedBlog });

  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.author.toString() !== req.user.toString()) {
      return res.status(403).json({ message: "Only author can delete this blog" });
    }

    await Blog.findByIdAndUpdate(req.params.id, { deleted: true });

    res.json({ message: "Blog deleted" });

  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};
