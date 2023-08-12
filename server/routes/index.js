import express from "express";
import objectsRoutes from "./objects.routes.js";
import companyRoutes from "./company.routes.js";
import districtsRoutes from "./districts.routes.js";
import metroRoutes from "./metro.routes.js";
import userRoutes from "./user.routes.js";
import objectStatusRoutes from "./object-status.routes.js";
import workingPositionRoutes from "./working-position.routes.js";
import authRoutes from "./auth.routes.js";
import uploadRoutes from "./upload.routes.js";

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

export default router;
