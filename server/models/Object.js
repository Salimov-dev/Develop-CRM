const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    status: String,
    company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    contact: {
      email: String,
      name: String,
      phone: Number,
      position: { type: Schema.Types.ObjectId, ref: "WorkingPosition" },
      position: { type: String },
    },
    accordTerms: {
      readyToContract: Boolean,
      readyToRenovation: Boolean,
      readyToRent: Boolean,
    },
    description: {
      fullDescription: { type: String },
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
      city: { type: String },
      district: { type: String },
      address: { type: String },
      metro: { type: String },
      latitude: { type: Number },
      longitude: { type: Number },
      zoom: { type: Number },
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "edited_at" },
  }
);

module.exports = model("Object", schema);
