import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String, default: null },
  tokenExpiry : {type: Date , default : null},
  isAdmin: { type: Boolean, default: false },
  isHidden: { type: Boolean, default:false }
});

export default User = mongoose.models.User || mongoose.model("User", UserSchema);