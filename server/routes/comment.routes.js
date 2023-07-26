const express = require("express");
const Comment = require("../models/Comment");
const auth = require("../middleware/auth.middleware");

const router = express.Router({ mergeParams: true });

router.route("/").get(async (req, res) => {
  try {
    const { orderBy, equalTo } = req.query;
    const list = await Comment.find({ [orderBy]: equalTo });
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
    });
    res.status(201).send(newComment);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.delete("/:commentId", auth, async (req, res) => {
  try {
    const { commentId } = req.params;
    await Comment.findByIdAndRemove(commentId);
    return res.send(null);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
