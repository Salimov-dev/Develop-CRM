const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/objects", require("./objects.routes"));
router.use("/company", require("./company.routes"));
router.use("/districts", require("./districts.routes"));
router.use("/metro", require("./metro.routes"));
router.use("/user", require("./user.routes"));
// router.use("/objectStatus", require("./object-status.routes"));
router.use("/objectStatus", require("./object-status.routes"));
router.use("/auth", require("./auth.routes"));

module.exports = router;
