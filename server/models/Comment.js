import { Schema, model } from "mongoose"

const schema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    noteId: {
      type: Schema.Types.ObjectId,
      ref: "Note",
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export default model("Comment", schema);
