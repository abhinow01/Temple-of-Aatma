import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    slug: {
      type: String,
    },
    body: {
      type: String,
    },
    image_alt_text: {
      type: String,
    },
    meta_title: {
      type: String,
    },
    meta_description: {
      type: String,
    },
    meta_keywords: [String],
    image: {
      // logo is image
      type: String,
    },
    blog_count: {
      type: Number,
    },
    isDraft : {
      type : String , 
      default : "true"
    }
  },
  { timestamps: true }
);

// Full-text search across multiple fields
blogSchema.index(
  { title: "text", body: "text", meta_keywords: "text", meta_description: "text" },
  { weights: { title: 5, meta_keywords: 3, body: 1 }, name: "WeightedTextSearch" }
);

// SEO-friendly slug
blogSchema.index({ slug: 1 }, { unique: true });

// Latest blogs
blogSchema.index({ createdAt: -1 });

// Draft/Published filter with date
blogSchema.index({ isDraft: 1, createdAt: -1 });

// Popular blogs
blogSchema.index({ blog_count: -1 });

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
