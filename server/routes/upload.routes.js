import express from "express"
import multer from "multer";
import Company from "../models/Company.js";

const router = express.Router({ mergeParams: true });

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single('avatar'), async (req, res) => {
  // try {
  //   res.json({
  //    url: `/uploads/${req.file.originalname}`
  //   })
  // const userId = req.user._id
  // const company = await Company.findOne({
  //   $or: [{managers: userId}, {curators: userId}]
  // })
  // console.log("userId", userId);
  console.log("req", req);
  // console.log("company", company);

  try {
   res.json({
    url: `/uploads/${req.file.originalname}`
    // url: `/uploads/${company._id}/avatars/${userId}`
   })
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

export default router;
