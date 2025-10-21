const SacredSpaceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  images: [{ type: String }],
  ctaText: { type: String, default: "Transform Your Home" },
  contactForm: {
    name: String,
    email: String,
    message: String,
  }, // for storing incoming form entries
  createdAt: { type: Date, default: Date.now },
});
const Blog = mongoose.models.SacredSpace || mongoose.model("Blog", SacredSpaceSchema);

export default SacredSpace;
