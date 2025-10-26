import { model, Schema } from "mongoose";

const ratingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rate: { type: Number, required: true, min: 0, max: 5 },
});

const outLineSchema = new Schema({
  title: { type: String, trim: true },
  discretion: { type: String, trim: true },
});

const schema = new Schema(
  {
    courseName: { type: String, required: true, trim: true, lowercase: true },
    description: { type: String, required: true, trim: true },
    courseCover: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    outline: { type: [outLineSchema] },
    conclusion: { type: [String] },
    // category: { type: String, trim: true },
    // we need it as enum
    // frontend backend
    targetAudience: { type: String, trim: true },
    hours: { type: Number },
    rating: { type: [ratingSchema], default: [] },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default model("courses", schema);
