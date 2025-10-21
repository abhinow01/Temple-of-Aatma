import mongoose from "mongoose";

const YatraSchema = new mongoose.Schema(
  {
    // Basic Info
    title: { type: String, required: true },                 // "Ayodhya Yatra — Inner Cleanse & Strength"
    slug: { type: String, required: true, unique: true },    // URL-friendly identifier

    // Description & Details
    summary: { type: String },                               // Short overview (for cards/previews)
    description: { type: String },                           // Full HTML / Markdown body content
    highlights: [{ type: String }],                          // Bullet points or key takeaways

    // Dates & Logistics
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    locationTitle: { type: String },                         

    // Pricing
    price: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    seatsTotal: { type: Number, default: 0 },
    seatsAvailable: { type: Number, default: 0 },

    // Media
    // brochureUrl: { type: String },                           // Brochure file (PDF / S3 / Cloudinary)
    images: [{ type: String }],                              // Gallery images
    image_alt_text: { type: String },                        // Alt text for main image

    // SEO Fields
    meta_title: { type: String },                            // "Ayodhya Yatra - Pilgrimage of the Soul"
    meta_description: { type: String },                      // 150–160 characters for SEO snippets
    meta_keywords: [String],                                 // ["ayodhya", "pilgrimage", "spiritual journey"]

    // Display & Publishing
    tags: [{ type: String }],                                // For filtering/search
    published: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    isDraft: { type: Boolean, default: true },               // Draft toggle

    // Metadata
    metadata: {
      durationDays: { type: Number },                        // Auto-calc or manual
      difficulty: { type: String },                          // Optional field
    },

    // Relations
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// === Indexes ===
YatraSchema.index({ slug: 1 }, { unique: true });
YatraSchema.index(
  { title: "text", summary: "text", description: "text", tags: "text", meta_keywords: "text", meta_description: "text" },
  { weights: { title: 5, meta_keywords: 3, summary: 2, description: 1 }, name: "WeightedTextSearch" }
);
YatraSchema.index({ startDate: 1, endDate: 1, price: 1 });
YatraSchema.index({ createdAt: -1 });

const Yatra = mongoose.models.Yatra || mongoose.model("Yatra", YatraSchema);
export default Yatra;
