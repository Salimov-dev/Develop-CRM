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
      phone: Number,
      // position: { type: Schema.Types.ObjectId, ref: "WorkingPosition" },
      position: { type: String },
    },
    accordTerms: {
      readyToContract: Boolean,
      readyToRenovation: Boolean,
      readyToRent: Boolean,
    },
    description: {
      fullDescription: { type: String, required: true },
    },
    estateOptions: {
      premisesFloor: String,
      premisesHeight: Number,
      rentPrice: Number,
      rentPriceForMetr: Number,
      rentSquare: Number,
      rentalHolidays: Number,
      securityDeposit: Number,
      totalSquare: Number,
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
