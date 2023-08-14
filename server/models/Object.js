import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    status: {
      type: Schema.Types.ObjectId,
      ref: "ObjectStatus",
      required: true,
    },
    company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    contact: {
      email: String,
      name: String,
      phone: Number,
      position: String,
      // position: { type: Schema.Types.ObjectId, ref: "WorkingPosition" },
    },
    accordTerms: {
      readyToContract: Boolean,
      readyToRenovation: Boolean,
      readyToRent: Boolean,
    },
    description: {
      fullDescription: { type: String },
    },
    commercialTerms: {
      rentPrice: Number,
      securityDeposit: Number,
      totalSquare: Number,
      rentSquare: Number,
      rentalHolidays: Number,
      agentComission: Number,
      indexingAnnual: Number,
      rentTypes: String,
    },
    estateOptions: {
      cadastralNumber: Number,
      // currentRenters: { type: Schema.Types.ObjectId, ref: "CurrentRenter" },
      currentRenters: String,
      electricityKw: Number,
      // objectConditions: { type: Schema.Types.ObjectId, ref: "ObjectCondition" },
      objectConditions: String,
      // estateTypes: { type: Schema.Types.ObjectId, ref: "EstateType" },
      estateTypes: String,
      loadingArea: String,
      // objectTypes: { type: Schema.Types.ObjectId, ref: "ObjectType" },
      objectTypes: String,
      parkingQuantity: Number,
      premisesFloor: String,
      premisesHeight: Number,
      waterSuply: String,
    },
    location: {
      city: { type: String, required: true },
      district: { type: Schema.Types.ObjectId, ref: "District" },
      address: { type: String, required: true },
      // metro: { type: Schema.Types.ObjectId, ref: "Metro" },
      metro: String,
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      zoom: { type: Number, required: true },
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "edited_at" },
  }
);

export default model("Object", schema);
