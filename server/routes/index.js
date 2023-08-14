import express from "express";
import objectsRoutes from "./objects.routes.js";
import companyRoutes from "./company.routes.js";
import districtsRoutes from "./districts.routes.js";
import metroRoutes from "./metro.routes.js";
import userRoutes from "./user.routes.js";
import objectStatusRoutes from "./object-status.routes.js";
import workingPositionRoutes from "./working-position.routes.js";
import authRoutes from "./auth.routes.js";
import uploadRoutes from "./upload-avatar.routes.js";
import currentRenterRoutes from "./current-renter.routes.js";
import objectConditionsRoutes from "./object-conditions.routes.js";
import rentTypeRoutes from "./rent-type.routes.js";
import objectTypeRoutes from "./object-type.routes.js";
import estateTypeRoutes from "./estate-type.routes.js";
import userStatusRoutes from "./user-status.routes.js";

const router = express.Router({ mergeParams: true });

router.use("/auth", authRoutes);
router.use("/objects", objectsRoutes);
router.use("/company", companyRoutes);
router.use("/districts", districtsRoutes);
router.use("/metro", metroRoutes);
router.use("/user", userRoutes);
router.use("/objectStatus", objectStatusRoutes);
router.use("/workingPosition", workingPositionRoutes);
router.use("/upload", uploadRoutes);
router.use("/currentRenter", currentRenterRoutes);
router.use("/objectConditions", objectConditionsRoutes);
router.use("/rentType", rentTypeRoutes);
router.use("/objectType", objectTypeRoutes);
router.use("/estateType", estateTypeRoutes);
router.use("/userStatus", userStatusRoutes);

export default router;
