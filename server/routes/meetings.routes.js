import express from "express";
import Meeting from "../models/Meeting.js"
import auth from "../middleware/auth.middleware.js";

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const list = await Meeting.find();
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.post("/create", auth, async (req, res) => {
  try {
    const newMeeting = await Meeting.create({ ...req.body });
    res.status(201).send(newMeeting);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.patch("/:meetingId?/edit", auth, async (req, res) => {
  try {
    const { meetingId } = req.params;
    await Meeting.findByIdAndUpdate(meetingId, req.body);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.delete("/:meetingId?", auth, async (req, res) => {
  try {
    const { meetingId } = req.params;
    await Meeting.findByIdAndRemove(meetingId);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

export default router;
