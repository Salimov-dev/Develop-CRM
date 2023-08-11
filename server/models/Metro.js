import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Metro", schema);
