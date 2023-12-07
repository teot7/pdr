import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
  make: { type: String, trim: true },
  model: { type: String, trim: true },
  year: { type: Number },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

export default mongoose.models.vehicles ||
  mongoose.model("Vehicle", VehicleSchema);
