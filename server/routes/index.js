const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/objects", require("./objects.routes"));
router.use("/category", require("./category.routes"));
router.use("/comment", require("./comment.routes"));
router.use("/note", require("./note.routes"));
router.use("/user", require("./user.routes"));
router.use("/auth", require("./auth.routes"));

module.exports = router;
