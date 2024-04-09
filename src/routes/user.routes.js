import { Router } from "express";
import { login, register } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

// uploading to server through multer middleware berfore posting
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  register
);
router.route("/login").post(login);

export default router;
