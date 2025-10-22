import { model, Schema } from "mongoose";

const ratingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rate: { type: Number, required: true, min: 0, max: 10 },
});

const schema = new Schema(
  {
    courseName: { type: String, required: true, trim: true, lowercase: true },
    courseCover: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    category: { type: String, trim: true },
    hours: { type: Number },
    rating: { type: [ratingSchema], default: [] },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default model("courses", schema);
