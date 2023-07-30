const express = require("express");
const District = require("../models/District");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const list = await District.find();
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

module.exports = router;
