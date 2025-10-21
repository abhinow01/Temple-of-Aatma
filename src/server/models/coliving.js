const CoLivingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  images: [{ type: String }], // array of URLs
  amenities: [{ type: String }],
  pricePerNight: { type: Number },
  availableFrom: { type: Date },
  availableTo: { type: Date },
  contactFormEmail: { type: String }, // where form queries go
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const coliving = mongoose.models.coliving || mongoose.model("Blog", CoLivingSchema);
export default coliving;
