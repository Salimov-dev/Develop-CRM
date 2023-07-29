const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    status: String,
    userId: { type: String, required: true },
    company: { type: String, required: true },
    // company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    // userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    contact: {
      email: String,
      name: String,
      phone: String,
      position: { type: Schema.Types.ObjectId, ref: "WorkingPosition" },
    },
    accordTerms: {
      readyToContract: String,
      readyToRenovation: String,
      readyToRent: String,
    },
    description: {
      comment: { type: String, required: true },
      fullDescription: { type: String, required: true },
    },
    estateOptions: {
      premisesFloor: String,
      premisesHeight: String,
      prepaidPrice: String,
      rentPrice: String,
      rentSquare: String,
      rentalHolidays: String,
      totalSquare: String,
    },
    lastContact: {
      result: String,
    },
    location: {
      city: { type: String, required: true },
      district: { type: String, required: true },
      address: { type: String, required: true },
      metro: { type: String, required: true },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      zoom: { type: Number, required: true },
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "edited_at" },
  }
);

module.exports = model("Object", schema);
